const mongoose = require('mongoose')

// Create the results moodel
let resultsModel = mongoose.model('users', {
    username: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = resultsModel