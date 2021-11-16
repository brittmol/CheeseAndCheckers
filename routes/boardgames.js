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
  })
}));

module.exports = router;


// REVIEW BUTTON: When click button to write review for game, button will be an href to redirect, including the boardgame/:id info,
// this enables us to find game by id and populate review page with that info. 
