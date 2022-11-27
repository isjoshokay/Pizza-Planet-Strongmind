const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
// Create the results moodel
let toppingsModel = mongoose.model('toppings', {
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    users: {
        type: ObjectId,
        ref: 'users',
        required: true
    },
})

module.exports = toppingsModel