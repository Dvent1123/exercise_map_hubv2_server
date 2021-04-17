const { UserRefreshClient } = require('google-auth-library')
const User = require('../models/user')

exports.read = (req, res) => {
    const userId = req.params.id
    User.findById(userId).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    })
}

exports.update = (req, res) => {
    const { name, password } = req.body
    console.log(req.user)

    User.findOne({ _id: req.user._id}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        if(!name) {
            return res.status(400).json({
                error: 'Name is required'
            })
        } else {
            user.name = name
        }
        if(password) {
            if(password.length < 6) {
                return res.status(400).json({
                    error: 'Password should be minimum 6 characters long'
                })
            } else {
                user.password = password
            }
        }

        user.save((err, updatedUser) => {
            if(err) {
                console.log('User update error', err)
                return res.status(400).json({
                    error: 'User update failed'
                })
            }
            updatedUser.hashed_password = undefined
            updatedUser.salt = undefined
            res.json(updatedUser)
        })
    })
}

exports.unlock = (req, res) => {
    let skillsArray = req.body

    //NOTES
    //this one kind of works, would have to pass all the exercises back from front end with exercises unlocked and updated
    //this wouldn't update one exercise it would just replace the whole array
    User.updateOne({_id: req.user._id},{ exercises: skillsArray} , (err, raw) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
    
        res.json({
            message: 'Skill Unlocked!'
        })
    })
}