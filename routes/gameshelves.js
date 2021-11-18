const express = require('express');
const { check, validationResult } = require('express-validator');
const { User, BoardGame, GameShelf, Category, Review, ShelvesToGame  } = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { requireAuth } = require('../auth');

const router = express.Router()

router.get('/', requireAuth, asyncHandler(async (req, res) => {
  const gameShelves = await GameShelf.findAll({
    where: {
      userId: req.session.auth.userId,
    }
  })
  console.log(gameShelves)
  res.render("gameshelves", {
    gameShelves,

  })
}));


// --------------------------------------
// instead of having another route, we should filter the page instead
// --------------------------------------
router.get("/:id(\\d+)", requireAuth, asyncHandler(async (req, res) => {
  const gameShelfId = req.params.id
  const gameShelf = await GameShelf.findByPk(gameShelfId)
  console.log(gameShelf.shelfName)
}));



module.exports = router;
