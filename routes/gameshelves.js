const express = require('express');
const { check, validationResult } = require('express-validator');
const { User, BoardGame, GameShelf, Category, Review, ShelvesToGame  } = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { requireAuth } = require('../auth');

const router = express.Router()

router.get('/', requireAuth, asyncHandler(async (req, res) => {
  const userId = req.session.auth.userId
  const gameShelves = await GameShelf.findAll({
    where: { userId }
  })
  // this array has all of the board games that include the shelf we are currently looking at
  const allGamesOfUserSet = new Set()
  const allGamesOfUserArray = await BoardGame.findAll({
    include: {
      model: GameShelf,
      where: {userId}
    }
  })
  allGamesOfUserArray.forEach(gameObj => {
    allGamesOfUserSet.add(gameObj)
  })
  allGamesOfUser = Array.from(allGamesOfUserSet)

  // console.log(gameShelves)
  res.render("gameshelves", {
    gameShelves,
    allGamesOfUser
  })
}));


// --------------------------------------
// instead of having another route, we should filter the page instead
// --------------------------------------
router.get("/:id(\\d+)", requireAuth, asyncHandler(async (req, res) => {
  const userId = req.session.auth.userId
  const gameShelfId = req.params.id
  const gameShelves = await GameShelf.findAll({
    where: { userId }
  })
  const gameShelf = await GameShelf.findByPk(gameShelfId, {
    where: { userId }
  })
  // console.log(gameShelf.shelfName)

  // this array has all of the board games that include the shelf we are currently looking at
  const allGamesOfUserSet = new Set()
  const allGamesOfUserArray = await BoardGame.findAll({
    include: {
      model: GameShelf,
      where: {
        id: gameShelfId,
        userId
      }
    }
  })
  allGamesOfUserArray.forEach(gameObj => {
    allGamesOfUserSet.add(gameObj)
  })
  allGamesOfUser = Array.from(allGamesOfUserSet)

  // console.log(gameShelves)
  res.render("gameshelf", {
    gameShelves,
    gameShelf,
    allGamesOfUser
  })
}));


router.put("/:newshelf", requireAuth, asyncHandler(async (req, res) => {
  const userId = req.session.auth.userId;
  console.log(req.body);
  const shelfName = req.params.newshelf;
  const newShelf = await GameShelf.create({
    shelfName,
    userId
  });
  res.json({ newShelfId: newShelf.id })
}))


module.exports = router;
