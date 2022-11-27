const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// Create the results moodel
let usersModel = mongoose.model('users', {
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

module.exports = usersModel