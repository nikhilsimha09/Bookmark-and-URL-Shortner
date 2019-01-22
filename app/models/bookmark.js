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
    }
})

bookmarkSchema.pre('save', function(next){
    if(this.isNew){
        let hashedUrl = shorthash.unique(this.originalUrl)
        this.hashedUrl = hashedUrl
    } 
    //console.log(shorthash.unique(this.originalUrl))
    next()
})

const Bookmark = mongoose.model('Bookmark', bookmarkSchema)

module.exports = {Bookmark}