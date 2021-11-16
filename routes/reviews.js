const express = require('express');
const { check, validationResult } = require('express-validator');
const { User, BoardGame, GameShelf, Category, Review,  } = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { requireAuth } = require('../auth');

const router = express.Router();

router.get("/new", csrfProtection, async (req, res)=> {
  const id = req.params.id;
  const boardGame = BoardGame.findByPk(id);
  res.render('review-new', {
    csrfToken: req.csrfToken(),
    title: boardGame.title,
    // NTS: image: boardGame.image,
    linkToGame: `/boardgames/${id}`
  })
})

module.exports = router;

//- Backend knows what thing we're writing a review for
//- button has ID or class name that'll be the id of the book
//- Can extract the :id from the params, and then use that to generate template
//- "Leave a Review" button must contain a link specific to particular indiv item
//- /boardgames/:id

//- can use req.params, which evaluates to obj that'll have path as k:v pairs
//- destrucure to get id or do req.params.id
