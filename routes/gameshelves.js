const express = require('express');
const { check, validationResult } = require('express-validator');
const { User, BoardGame, GameShelf, Category, Review, ShelvesToGame  } = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { requireAuth } = require('../auth');

const router = express.Router()

router.get('/', requireAuth, asyncHandler(async (req, res) => {
  const userId = req.session.auth.userId
  const gameShelves = await GameShelf.findAll({
    where: { userId },
    order: [
      ['shelfName', 'ASC']
    ]
  })

  // have want to play, played, and favorites shelves separate
  // have rest of gameShelves
  let wantToPlayShelf
  let playedShelf
  let favoritesShelf
  let otherGameShelves = []
  gameShelves.forEach(shelfObj => {
    if(shelfObj.shelfName == 'Want to Play') {
      wantToPlayShelf = shelfObj
    }
    if(shelfObj.shelfName == 'Played') {
      playedShelf = shelfObj
    }
    if(shelfObj.shelfName == 'Favorites') {
      favoritesShelf = shelfObj
    }
    if(shelfObj.shelfName !== 'Played' && shelfObj.shelfName !== 'Want to Play' && shelfObj.shelfName !== 'Favorites') {
      otherGameShelves.push(shelfObj)
    }
  })

  console.log("wantToPlayShelf ===", wantToPlayShelf)
  console.log("playedShelf ===", playedShelf)
  console.log("favoritesShelf ===", favoritesShelf)
  console.log("otherGameShelves ===", otherGameShelves)


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
    wantToPlayShelf,
    playedShelf,
    favoritesShelf,
    otherGameShelves,
    allGamesOfUser
  })
}));


// // --------------------------------------
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
}));


router.put("/:oldShelfId/:newShelfName", requireAuth, asyncHandler(async (req, res) => {
  const userId = req.session.auth.userId;
  console.log(req.body);
  const newShelfName = req.params.newShelfName
  const oldShelfId = req.params.oldShelfId;
  await GameShelf.update({ shelfName: newShelfName }, {
    where: {
      id: oldShelfId,
      userId,
    }
  })
  const newShelf = await GameShelf.findOne({
    where: {
      shelfName: newShelfName,
      userId,
    }
  })
  console.log(newShelf)
  res.json({
    newShelfId: newShelf.id,
    newShelfName: newShelf.shelfName
  });
}))

router.delete('/:id(\\d+)', asyncHandler(async(req, res) => {
  const id = req.params.id
  console.log(id)
  const shelfToDelete = await GameShelf.findByPk(id)
  console.log("shelftToDelete =", shelfToDelete)
  if (shelfToDelete) {
    await shelfToDelete.destroy({
      where: {
        gameShelfId: id
      }
    });

    await GameShelf.destroy({
      where: {
        id,
      }
    })
    res.json({message: "success"})

  } else {
    res.json({message: "failure"})
  }

}))


module.exports = router;
