const express = require("express");
const { check, validationResult } = require("express-validator");
const {
  User,
  BoardGame,
  GameShelf,
  Category,
  Review,
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
    const boardGame = await BoardGame.findByPk(req.params.id);
    const reviews = await Review.findAll({
      where: { boardGameId: req.params.id },
    });
    if (req.session.auth) {
      const userId = req.session.auth.userId;
      const gameShelves = await GameShelf.findAll({ where: {userId}});
      return res.render("ind-boardgame", {
        boardGame,
        reviews,
        userId,
        gameShelves
      });
    } else {
      res.render("ind-boardgame", {
        boardGame,
        reviews,
      });
    }
  })
);

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
