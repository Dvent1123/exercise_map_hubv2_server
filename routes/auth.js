const express = require('express')
const router = express.Router()

//import controllers
const { signup, signin, googleLogin } = require('../controller/auth')

//import validators
const { userSignupValidator, userSigninValidator } = require('../validators/auth')
const {runValidation} = require('../validators/index')

router.post('/signup', userSignupValidator, runValidation, signup)

router.post('/signin', userSigninValidator, runValidation, signin)

router.post('/google-login', googleLogin)

module.exports = router