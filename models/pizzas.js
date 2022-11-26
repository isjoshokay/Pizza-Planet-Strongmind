const mongoose = require('mongoose')

// Create the results moodel
let pizzasModel = mongoose.model('pizzas', {
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
    createdby: {
        type: String,
        required: true
    },
})

module.exports = pizzasModel