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
    // need this to be specific to game
    const boardGameId = 1
    // -----------------------
    const boardGames = await BoardGame.findAll();
    if (req.session.auth) {
      const userId = req.session.auth.userId;
      const gameShelves = await GameShelf.findAll({ where: {userId}});
      const mainGameShelves = []
      gameShelves.forEach(shelfObj => {
        if(shelfObj.shelfName === 'Played' || shelfObj.shelfName === 'Want to Play') {
          mainGameShelves.push(shelfObj)
        }
      })

      const shelvesWithGameSet = new Set()
      const shelvesWithGameArray = await GameShelf.findAll({
        include: {
          model: BoardGame,
          where: {id: boardGameId}
        }
      })
      shelvesWithGameArray.forEach(shelfObj => {
        shelvesWithGameSet.add(shelfObj.id)
      })
      return res.render("boardgames", {
        boardGames,
        userId,
        mainGameShelves,
        shelvesWithGameSet,
      });
    } else {
      res.render("boardgames", {
        boardGames,
      });
    }
  })
);


// ----------- Search function -----------------
// router.post('/', asyncHandler(async (req, res) => {
//   const { term } = req.body
//   const boardGames = await BoardGame.findAll({
//     where: {
//       title: {
//         [Op.iLike]: `%${term}%`
//       }
//     },
//   })

//   if (req.session.auth) {
//   .... copy rest from '/'


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

      // const gameOnMainGameShelfId = null
      // shelvesWithGameArray.forEach(shelfObj => {
      //   if (shelfObj.id === mainGameShelves[0].id) {
      //     gameOnMainGameShelfId =
      //   }
      // })


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

      console.log("Main Shelves ===", mainGameShelves)
      console.log("shelvesWithGameSet ===", shelvesWithGameSet)

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
// checkboxes
router.put("/:boardgameid(\\d+)/:gameshelfid(\\d+)/:checked", asyncHandler(async(req, res) => {
  const boardGameId = req.params.boardgameid
  const gameShelfId = req.params.gameshelfid
  const checked = req.params.checked
  if (checked === 'true') {
    // add game to shelf
    await ShelvesToGame.create({
      boardGameId,
      gameShelfId
    })
  } else {
    // remove game from shelf
    await ShelvesToGame.destroy({
      where: {
        boardGameId,
        gameShelfId}
    })
  }
  res.json({message: 'Success'})
}))


// drop down (playing status)
router.put("/:boardgameid(\\d+)/:gameshelfid(\\d+)", asyncHandler(async(req, res) => {
  const boardGameId = req.params.boardgameid

  // we need to do parseInt because the choose option value is = 0, which is falsey, but "0" is truthy
  const gameShelfId = parseInt(req.params.gameshelfid, 10)
  if (gameShelfId) {

    wantToPlayShelf = await GameShelf.findAll({ where: {userId, shelfName: 'Want to Play' }})
    playedShelf = await GameShelf.findAll({ where: {userId, shelfName: 'Played' }})

    console.log(playedShelf)

    /*
    step 1: find the shelf object that is "Want to Play" and "Played"
      wantShelf = await GameShelf.findAll({ where: {userId, shelfName: 'Want to Play' }})
      playedShelf = await GameShelf.findAll({ where: {userId, shelfName: 'Played' }})
    step 2: check if boardgame is on either of those shelves
              if boardgame is on wantShelf, remove it
              if boardgame is on playedShelf, remove it
                  await ShelvesToGame.destroy({
                    where: {
                      boardGameId,
                      gameShelfId}
                  })
    step 3: add boardgame to shelf that is selected
              await ShelvesToGame.create({
                boardGameId,
                gameShelfId
              })
    step 4:  res.json({message: 'Success'})

    */
  } else {
    /*
    // selected choose fail
    res.json ({message: 'Remove})
    */
  }


  // if (checked === 'true') {
  //   // add game to shelf
  //   await ShelvesToGame.create({
  //     boardGameId,
  //     gameShelfId
  //   })
  // } else {
  //   // remove game from shelf
  //   await ShelvesToGame.destroy({
  //     where: {
  //       boardGameId,
  //       gameShelfId}
  //   })
  // }
  res.json({message: 'Success'})

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
