const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const Toppings = require('../models/toppings')

router.get('/', async (req, res, next) => {
    // In order to access this page, the user must be authenticated. That user's data will be passed to the template. 
    // Depending on the type of user, a different page is rendered.
    if (req.isAuthenticated()){
        let toppings = await Toppings.find({})
        res.render('dashboard', {user: req.user, title: 'Dashboard', data: toppings})
    } else {
        res.redirect('/')
    }  
})

module.exports = router