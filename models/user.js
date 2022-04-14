const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    //M or F
    sex: {
        type: String,
        required: true,
        default: "M"
    },
    //power, oly, cali, other
    typeOfAthlete: {
        type: String,
        required: true,
        default: "cali"
    },
    weight: {
        type: Number,
        required: true,
        default: 100
    },
    exercises: {
        type: Array,
    },
    personalRecords: {
        type: Array
    },
    hashed_password: {
        type: String,
        required: true,
    },
    salt: String,
    role: {
        type: String,
        default: 'subscriber'
    },
    resetPasswordLink: {
        data: String,
        default: ''
    }
}, {timestamps: true})

userSchema.virtual('password')
.set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this._password
})

userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password) {
        if(!password) return ''
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch(err) {
            return ''
        }
    },
    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + ''
    }
}

module.exports = mongoose.model('User', userSchema)