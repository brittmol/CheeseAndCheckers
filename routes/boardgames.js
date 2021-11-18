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

const router = express.Router();


router.get(
  "/",
  asyncHandler(async (req, res) => {
    const boardGames = await BoardGame.findAll();
    if (req.session.auth) {
      const userId = req.session.auth.userId;
      const gameShelves = await GameShelf.findAll({ where: {userId}});
      return res.render("boardgames", {
        boardGames,
        userId,
        gameShelves
      });
    } else {
      res.render("boardgames", {
        boardGames,
      });
    }
  })
);

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const boardGameId = req.params.id
    const boardGame = await BoardGame.findByPk(boardGameId);
    const reviews = await Review.findAll({
      where: { boardGameId },
    });
    if (req.session.auth) {
      const userId = req.session.auth.userId;
      const gameShelves = await GameShelf.findAll({ where: {userId}});
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
      return res.render("ind-boardgame", {
        boardGame,
        reviews,
        userId,
        gameShelves,
        shelvesWithGameSet
      });
    } else {
      res.render("ind-boardgame", {
        boardGame,
        reviews,
      });
    }
  })
);

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

router.get(
  "/:id/reviews/new", requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    const boardGame = await BoardGame.findByPk(id);
    console.log(boardGame.title, "this is the line we")
    res.render("review-new", {
      csrfToken: req.csrfToken(),
      boardGame,
      // NTS: image: boardGame.image,
      linkToGame: `/boardgames/${id}`,
    });
  })
);

const reviewValidator = [
  check('comment')
    .exists({ checkFalsy: true })
    .withMessage("Provide a comment before posting"),
];

router.post(
  "/:id/reviews/new",csrfProtection,requireAuth,
   reviewValidator,

  asyncHandler(async (req, res) => {
    const { comment } = req.body;
    let boardGameId = req.params.id;

    const boardGame = await BoardGame.findByPk(boardGameId);

    const userId = req.session.auth.userId;
    const review = await Review.build({ comment, boardGameId, userId});
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await review.save();
      res.redirect(`/boardgames/${boardGame.id}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('review-new', {
        csrfToken: req.csrfToken(),
        comment,
        errors,
        boardGame
      })
    }
  })
);

module.exports = router;

// REVIEW BUTTON: When click button to write review for game, button will be an href to redirect, including the boardgame/:id info,
// this enables us to find game by id and populate review page with that info.
