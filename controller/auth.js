const User = require('../models/user')
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const { OAuth2Client } = require('google-auth-library')
let dataModule = require('../data/data')

exports.signup = (req, res) => {
    console.log('REQ BODY ON SIGNUP', req.body)
    const { name, email, password } = req.body
    const exercises = dataModule.exerciseData

    User.findOne({ email: email }).exec((err, user) => {
        if(user) {
            return res.status(400).json({
                error: 'Email is taken'
            })
        }
        if(err) {
            return res.status(400).json({
                error: 'There was a network error'
            })
        }
    })

    let newUser = new User({name, email, password, exercises})

    newUser.save((err, success) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
    
        res.json({
            message: 'Signup success! Please sign in'
        })
    })
}

exports.signin = (req, res) => {
    const { email, password } = req.body
    console.log('this is the email and password', email, password)

    User.findOne({ email}).exec((err, user) => {
        if(err || !user ){
            return res.status(400).json({
                error: 'User with that email does not exist. Please sign up'
            })
        }
        if(!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match'
            })            
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
        const {_id, name, email, role} = user

        return res.json({
            token,
            user: {_id, name, email, role}
        })
    })
}

exports.requireSignin = expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
})

exports.adminMiddleware = (req, res, next) => {
    User.findById({ _id: req.user._id }).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }

        if(user.role !== 'admin') {
            return res.status(400).json({
                error: 'Admin resource. Access denied'
            })
        }

        req.profile = user
        next()
    })
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
exports.googleLogin = (req, res) => {
    const { idToken } = req.body

    client.verifyIdToken({idToken, audience: process.env.GOOGLE_CLIENT_ID}).then(response => {
        const { email_verified, name, email } = response.payload
        if(email_verified) {
            User.findOne({email}).exec((err, user) => {
                if(user) {
                    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
                    const {_id, email, name, role} = user

                    return res.json({
                        token, user: {_id, email, name, role}
                    })
                } else{
                    let password = email + process.env.JWT_SECRET
                    user = new User({name, email, password})
                    user.save((err, data) => {
                        if(err) {
                            console.log('Error Google Login on User Save', err)
                            return res.status(400).json({
                                error: 'User signup failed with Google'
                            })
                        }

                        const token = jwt.sign({_id: data._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
                        const {_id, email, name, role} = data
    
                        return res.json({
                            token, user: {_id, email, name, role}
                        })
                    })
                }
            })
        } else {
            return res.status(400).json({
                error: 'Google login failed. Try again'
            })
        }
    })
}