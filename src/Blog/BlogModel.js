const { Schema, model } = require('mongoose')

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true 
    },
    date: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
})

module.exports = model('Blog', schema)