const express = require('express');
const { check, validationResult } = require('express-validator');
const { User, BoardGame, GameShelf, Category, Review,  } = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { requireAuth } = require('../auth');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const boardGames = await BoardGame.findAll()
  res.render('boardgames', {
    boardGames,
  });
}));

router.get("/:id(\\d+)", asyncHandler(async (req, res) => {
  const boardGame = await BoardGame.findByPk(req.params.id)
  const reviews = await Review.findAll({ where: { boardGameId: req.params.id } })
  
  res.render('ind-boardgame', {
    boardGame,
    reviews,
  });
}));

module.exports = router;
