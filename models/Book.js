const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
        trim: true
    },
    author: {
        type:String,
        required: true
    },
    genre: {
        type:String,
        required: true,
    },
    pages: {
        type: Number,
    },
    synopsis: {
        type: String,
        required: true
    },
    user: {
        type: String,
        ref: 'User'
    },
    createdAt: {
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Book', BookSchema)