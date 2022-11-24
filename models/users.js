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
    lname: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    permissions: {
        type: String,
        required: true
    },
    profileimg: {
        type: String,
    }
})

module.exports = resultsModel