const express = require('express');
const { check, validationResult } = require('express-validator');
const { User, BoardGame, GameShelf, Category, Review,  } = require('../db/models');
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
}));

// router.get("/:id(\\d+)", requireAuth, asyncHandler(async (req, res) => {
  
// }));

module.exports = router;
