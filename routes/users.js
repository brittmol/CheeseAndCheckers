const express = require('express');
const { User, GameShelf } = require('../db/models')
const { check, validationResult } = require('express-validator')
const bcrypt= require('bcryptjs')
const { csrfProtection,asyncHandler}= require('./utils');
const { loginUser, logoutUser } = require('../auth')

const router = express.Router();
/* GET users listing. */

router.get('/signup', csrfProtection,  (req,res)=>{
  const user = User.build()
  res.render('user-signup', {
    title: 'Sign up',
    user,
    csrfToken: req.csrfToken(),
  })
})

router.get('/login', csrfProtection,  (req,res)=>{
  res.render('user-login', {
    title: 'Log in',
    user: {},
    csrfToken: req.csrfToken(),
  })
})

const userValidators = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Provide a username')
    .isLength({ max: 50 })
    .withMessage('Username cannot exceed 50 characters')
    .custom((value) => {
      return User.findOne({ where: { username: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided username is already in use by another account');
          }
        });
    }),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Provide an email address')
    .isLength({ max: 255 })
    .withMessage('Email address cannot exceed 255 characters')
    .isEmail()
    .withMessage('Provide a valid email address')
    .custom((value) => {
      return User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided email address is already in use by another account');
          }
        });
    }),
  check('password')
    .exists({ checkFalse: true })
    .withMessage('Provide a password')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Confirm password')
    .isLength({ max: 50 })
    .withMessage('Confirmed password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirmed password does not match password');
      }
      return true;
    }),
];

router.post('/signup', csrfProtection, userValidators, asyncHandler( async(req, res) => {
  const {
    username,
    email,
    password
  } = req.body;

  const user = User.build({
    username,
    email,
  });

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    await GameShelf.create(
      {
        shelfName: "Want to play",
        userId: user.id,
      }
    )
    await GameShelf.create(
      {
        shelfName: "Played",
        userId: user.id,
      }
    )

    loginUser(req, res, user)
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('user-signup', {
      title: 'Sign Up',
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  }


}))

const loginValidators = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Provide a value for username'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Provide a value for password'),
]

router.post('/login', csrfProtection, loginValidators, asyncHandler(async (req, res) => {
  const {
    username,
    password,
  } = req.body


  let errors = [];
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const user = await User.findOne({ where: { username } })

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());

      if (passwordMatch) {
        loginUser(req, res, user)

        return
      }
    }

    errors.push('Login failed for the provided username and password');
  } else {
    errors = validatorErrors.array().map((error) => error.msg);
  }

  res.render('user-login', {
    title: 'Login',
    username,
    errors,
    csrfToken: req.csrfToken(),

  });

}))

router.post('/demo-user', asyncHandler(async(req, res) => {
  const demoUser = await User.findOne({ where: { username: "DemoUser" } })
  loginUser(req, res, demoUser)


}))

router.post('/logout', (req, res) => {
  logoutUser(req, res)

})


module.exports = router;
