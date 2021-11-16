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
