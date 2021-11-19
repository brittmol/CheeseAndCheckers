const express = require("express");
const { check, validationResult } = require("express-validator");
const {
  User,
  BoardGame,
  GameShelf,
  Category,
  Review,
  ShelvesToGame
} = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");
const { requireAuth } = require("../auth");
const { Op } = require('sequelize');


const router = express.Router();

// ------------- boardgames route ---------------

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const boardGames = await BoardGame.findAll();
    if (req.session.auth) {
      const userId = req.session.auth.userId;
      return res.render("boardgames", {
        boardGames,
        userId,
      });
    } else {
      res.render("boardgames", {
        boardGames,
      });
    }
  })
);


// ----------- Search function -----------------
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { term } = req.body
    const boardGames = await BoardGame.findAll({
      where: {
        title: {
          [Op.iLike]: `%${term}%`
        }
      },
    })
    if (req.session.auth) {
      const userId = req.session.auth.userId;
      return res.render("boardgames", {
        boardGames,
        userId,
      });
    } else {
      res.render("boardgames", {
        boardGames,
      });
    }
  })
);


// -------------- individual board game route -------------

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const boardGameId = req.params.id
    const boardGame = await BoardGame.findByPk(boardGameId);
    let reviews = await Review.findAll({
      where: { boardGameId },
    });

    if (req.session.auth) {
      const userId = req.session.auth.userId;
      const gameShelves = await GameShelf.findAll({ where: {userId}});
      const mainGameShelves = []
      const otherGameShelves = []
      gameShelves.forEach(shelfObj => {
        if(shelfObj.shelfName !== 'Played' && shelfObj.shelfName !== 'Want to Play') {
          otherGameShelves.push(shelfObj)
        } else {
          mainGameShelves.push(shelfObj)
        }
      })

      // this array has all of the game shelves that include the game we are currently looking at
      const shelvesWithGameArray = await GameShelf.findAll({
        where: { userId },
        include: {
          model: BoardGame,
          where: {id: boardGameId}
        }
      })

      // this is iterating over an array to create a set that adds shelves that contain the game we are looking at currently
      // we put it into a Set so the pug template to use Set.has() function
      // could have used array.include, but that is O(n) and Set is O(1)
      const shelvesWithGameSet = new Set()
      shelvesWithGameArray.forEach(shelfObj => {
        shelvesWithGameSet.add(shelfObj.id)
      })

      let usersReviews=[]
      let notUsersReviews= []
      reviews.forEach(review=>{
        if(userId==review.userId){
          usersReviews.push(review)
        }else{
          notUsersReviews.push(review)
        }
      })
       reviews= [...usersReviews,...notUsersReviews]

      // console.log("Main Shelves ===", mainGameShelves)
      // console.log("shelvesWithGameSet ===", shelvesWithGameSet)

      return res.render("ind-boardgame", {
        boardGame,
        reviews,
        userId,
        otherGameShelves,
        mainGameShelves,
        shelvesWithGameSet,
      });
    } else {
      res.render("ind-boardgame", {
        boardGame,
        reviews,
      });
    }
  })
);

// ---------------- edit game shelves on individual board game page -------------------

// ---------- helper functions ---------------
const checkIfGameOnShelf = (boardGameId, shelfGamesArray) => {
  const shelfGamesSet = new Set()
  shelfGamesArray.forEach(gameObj => shelfGamesSet.add(gameObj.id))
  return shelfGamesSet.has(boardGameId)
}

const removeGameFromShelf = async(boardGameId, gameShelfId) => {
  await ShelvesToGame.destroy({
    where: {
      boardGameId,
      gameShelfId}
  })
}

const addGameToShelf = async(boardGameId, gameShelfId) => {
  await ShelvesToGame.create({
      boardGameId,
      gameShelfId
  })
}


// checkboxes
router.put("/:boardgameid(\\d+)/:gameshelfid(\\d+)/:checked", requireAuth, asyncHandler(async(req, res) => {
  const boardGameId = req.params.boardgameid
  const gameShelfId = req.params.gameshelfid
  const checked = req.params.checked
  console.log('boardGameId ===', boardGameId)
  console.log('gameShelfId ===', gameShelfId)
  if (checked === 'true') {
    await addGameToShelf(boardGameId, gameShelfId)
  } else {
    await removeGameFromShelf(boardGameId, gameShelfId)
  }
  res.json({message: 'Success'})
}))


// drop down (playing status)
router.put("/:boardgameid(\\d+)/:gameshelfid(\\d+)", requireAuth, asyncHandler(async(req, res) => {
  const userId = req.session.auth.userId;
  // need it to strictly be a number to use in the Set
  const boardGameId = parseInt(req.params.boardgameid, 10)
  // we need to do parseInt because the choose option value is = 0, which is falsey, but "0" is truthy
  const gameShelfId = parseInt(req.params.gameshelfid, 10)

  const wantToPlayShelf = await GameShelf.findOne({
    where: {
      userId,
      shelfName: 'Want to Play'
    },
    include: [BoardGame]
  })

  const playedShelf = await GameShelf.findOne({
    where: {
      userId,
      shelfName: 'Played'
    },
    include: [BoardGame]
  })

  const gameIsOnWTP = checkIfGameOnShelf(boardGameId, wantToPlayShelf.BoardGames)
  const gameIsOnPlayed = checkIfGameOnShelf(boardGameId, playedShelf.BoardGames)

  if (gameIsOnWTP) await removeGameFromShelf(boardGameId, wantToPlayShelf.id)
  if (gameIsOnPlayed) await removeGameFromShelf(boardGameId, playedShelf.id)


  if (gameShelfId) {  // 1 or 2 (not 0)
    await addGameToShelf(boardGameId, gameShelfId)
    res.json({message: 'Added'})
  } else {  // picked -- choose option --- (0)
    res.json ({message: 'Removed'})
  }

}))

// ---------------- REVIEWS ROUTES ----------------------

router.get(
  "/:id/reviews/new",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    const boardGame = await BoardGame.findByPk(id);
    console.log(boardGame.title, "this is the line we");
    res.render("review-new", {
      csrfToken: req.csrfToken(),
      boardGame,
      linkToGame: `/boardgames/${id}`,
    });
  })
);

const reviewValidator = [
  check("comment")
    .exists({ checkFalsy: true })
    .withMessage("Provide a comment before posting"),
];

router.post(
  "/:id/reviews/new",
  csrfProtection,
  requireAuth,
  reviewValidator,

  asyncHandler(async (req, res) => {
    const { comment } = req.body;
    let boardGameId = req.params.id;

    const boardGame = await BoardGame.findByPk(boardGameId);

    const userId = req.session.auth.userId;
    const review = await Review.build({ comment, boardGameId, userId });
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await review.save();
      res.redirect(`/boardgames/${boardGame.id}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("review-new", {
        csrfToken: req.csrfToken(),
        comment,
        errors,
        boardGame,
      });
    }
  })
);

router.get(
  "/:id/reviews/:reviewId/edit",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const reviewId = req.params.reviewId;

    const boardGame = await BoardGame.findByPk(id);
    const review = await Review.findByPk(reviewId);

    res.render("review-edit", {
      csrfToken: req.csrfToken(),
      boardGame,
      review,
      linkToGame: `/boardgames/${id}`,
    });
  })
);

const reviewNotFoundError = (reviewId) => {
  const error = new Error(`Could not find a review with id: ${reviewId}`);
  error.title = "Review not found";
  error.status = 404;
  return error;
};

router.post(
  "/:id/reviews/:reviewId/edit",
  csrfProtection,
  requireAuth,
  reviewValidator,
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const reviewId = req.params.reviewId;

    const boardGame = await BoardGame.findByPk(id);
    const review = await Review.findByPk(reviewId);
    console.log(review);

    if (review) {
      const { comment } = req.body;
      const revisedComment = await review.update({ comment });
      res.redirect(`/boardgames/${boardGame.id}`);
    } else {
      next(reviewNotFoundError(reviewId));
    }
  })
);

router.delete(`/:boardGameId/reviews/:reviewId`,requireAuth,
asyncHandler(async(req,res)=>{
  //find record
  const reviewId = req.params.reviewId;
  const review = await Review.findByPk(reviewId);

  if(review){
    await review.destroy()
    res.json({message:'Success'})
  }else{
    res.json({message:'Faliure'})
  }
})

)


module.exports = router;

// REVIEW BUTTON: When click button to write review for game, button will be an href to redirect, including the boardgame/:id info,
// this enables us to find game by id and populate review page with that info.


// when grabbing reviews in arr,
