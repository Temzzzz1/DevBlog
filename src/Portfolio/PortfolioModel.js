const { Schema, model } = require('mongoose')


const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true 
    },
    imageURL: {
        type: String,
        required: true
    },
    imageSize: {
        type: String,
        required: true
    },
    repURL: {
        type: String,
        required: true
    }
})

module.exports = model('Portfolio', schema)