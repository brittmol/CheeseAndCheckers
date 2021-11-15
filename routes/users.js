const express = require('express');
const {User}= require('../db/models')
const bcrypt= require('bcryptjs')
const { csrfProtection,asyncHandler}= require('./utils')

const router = express.Router();
/* GET users listing. */
router.get('/signup', csrfProtection,  (req,res)=>{

  const user = User.build()

  res.render('user-sign-up', {

    title: 'Sign up',
    user,
    csrfToken: req.csrfToken(),

  })

})
router.get('/login', csrfProtection,  (req,res)=>{



  res.render('user-log-in', {

    title: 'Log in',
    user: {},
    csrfToken: req.csrfToken(),

  })

})


module.exports = router;
