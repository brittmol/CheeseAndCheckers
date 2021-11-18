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

      const shelvesWithGameSet = new Set()
      // this array has all of the game shelves that include the game we are currently looking at
      const shelvesWithGameArray = await GameShelf.findAll({
        include: {
          model: BoardGame,
          where: {id: boardGameId}
        }
      })
      // console.log('.......games.......')
      // console.log(shelvesWithGameArray[0])

      // this is iterating over an array to create a set that adds shelves that contain the game we are looking at currently
      // we put it into a Set so the pug template to use Set.has() function
      // could have used array.include, but that is O(n) and Set is O(1)
      shelvesWithGameArray.forEach(shelfObj => {
        shelvesWithGameSet.add(shelfObj.id)
      })

      // theres an error in this code
      // console.log('reviews === ', reviews)
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



// ---------------- REVIEWS ROUTES ----------------------

//How to display user's reviews at the top:
// iterate over arr (all reviews), if userId matches logged in user id
    // put it in user's reviews, if so

// allReviews: iterate over, do conditional check: if current logged in user's id matches the review's userId

//Push into these two arrays:
// usersReviews
// notUsersReviews
// reviews = [...usersReviews, ...nothTheirReviews]
// then iterate over this array

// How to create trash can/"X" to delete dynamically using AJAX?
// in pug template: conditionally if reviewUserID = loggedInUserId, add HTML to click delete/edit
// on backedn, check if the user has permission to actually delete is (does their userId match the review's user id)


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
      // NTS: image: boardGame.image,
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
