const mongoose = require('mongoose')
const validator = require('validator')
const shorthash = require('shorthash')
const { Schema }= mongoose
const bookmarkSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    originalUrl: {
        type: String,
        validate:{
            validator: (value) => {
                return validator.isURL(value)
            },
            message: () => {
                return 'URL you have entered is invalid'
            }
        },
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    hashedUrl: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    clicks: [{
        clickedDateTime: {type: Date, default:Date.now},
        ipAddress: {type: String},
        browserName: {type: String},
        osType: {type: String},
        deviseType: {type: String}
    }]
})

bookmarkSchema.pre('save', function(next){
    if(this.isNew){
        let hashedUrl = shorthash.unique(this.originalUrl)
        this.hashedUrl = hashedUrl
    }
    next()
})

const Bookmark = mongoose.model('Bookmark', bookmarkSchema)

module.exports = {Bookmark}