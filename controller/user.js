const { UserRefreshClient } = require('google-auth-library')
const User = require('../models/user')
let personalRecordsModuleMale = require('../data/powerdataM')
let personalRecordsModuleFemale = require('../data/powerdataF')

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
    const { name, password, weight, sex } = req.body

    User.findOne({ _id: req.user._id}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        if(!name) {
            return res.status(400).json({
                error: 'These fields are required'
            })
        } else {
            user.name = name
        }
        if(!weight) {
            return res.status(400).json({
                error: 'These fields are required'
            })
        } else {
            user.weight = weight
        }
        if(!sex) {
            return res.status(400).json({
                error: 'These fields are required'
            })
        } else {
            user.sex = sex
        }
        if(password) {
            if(password.length < 6) {
                return res.status(400).json({
                    error: 'Password should be minimum 6 characters long'
                })
            } else {
                // Virtual takes password and passes it through
                // functions
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
            res.json(updatedUser)
        })
    })
}

exports.athlete = (req, res) => {
    let { sex, type: athlete, weight } = req.body
    if(weight === 100 && sex === 'M'){
        weight = 114
    } else if(weight === 100 && sex === 'F'){
        weight = 97
    }
    //here change if personalRecords are either dataM or dataF based on sex
    let personalRecords = []
    if(sex === 'M'){
        personalRecords = personalRecordsModuleMale.powerdataM
    } else{
        personalRecords = personalRecordsModuleFemale.powerdataF
    }
    console.log(personalRecords)

    User.findOne({ _id: req.user._id}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        if(!sex || !athlete ) {
            return res.status(400).json({
                error: 'These fields are required'
            })
        } else {
            // Check to see if weight class is already in the Personal Records Array
            // If it is not in the array then add it
            // Else do nothing
            // personalRecords[x].id

            personalRecords.forEach( record => {
                if(!containsObject(record.id, user.personalRecords, sex) && record.id === weight){
                    user.personalRecords.push(record)
                }
            })

            user.sex = sex,
            user.typeOfAthlete = athlete,
            user.weight = weight
        }

        user.save((err, updatedUser) => {
            if(err) {
                console.log('Athlete update error', err)
                return res.status(400).json({
                    error: 'Athlete update failed'
                })
            }
            res.json(updatedUser)
        })
    })
}

// Function to check is an object is inside of the array or not
function containsObject(id, list, sex) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].id === id && list[i].sex === sex) {
            return true;
        }
    }

    return false;
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
            skillsArray: skillsArray
        })
    })
}

exports.prupdate = (req, res) => {
    let personalRecordArray = req.body

    //NOTES
    //this one kind of works, would have to pass all the exercises back from front end with exercises unlocked and updated
    //this wouldn't update one exercise it would just replace the whole array
    User.updateOne({_id: req.user._id},{ personalRecords: personalRecordArray} , (err, raw) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
    
        res.json({
            message: 'New PR!!'
        })
    })
}