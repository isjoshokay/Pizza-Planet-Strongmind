const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const Toppings = require('../models/toppings')

router.get('/', async (req, res, next) => {
    // In order to access this page, the user must be authenticated. That user's data will be passed to the template. 
    let user = await Users.findOne({})
    let data = await Toppings.find({})
    res.render('dashboard', {user: user, title: 'Dashboard', data: data})
})


module.exports = router