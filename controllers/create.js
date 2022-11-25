const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const Toppings = require('../models/toppings')
const Pizzas = require('../models/pizzas')
router.get('/', async (req, res, next) => {
    // In order to access this page, the user must be authenticated. That user's data will be passed to the template. 
    res.render('create', {success: true})
})


module.exports = router