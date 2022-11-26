const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const Toppings = require('../models/toppings')

router.get('/', async (req, res, next) => {
    // In order to access this page, the user must be authenticated. That user's data will be passed to the template. 
    console.log('Inside dashboard controller')
    console.log(`Authenticated: ${req.isAuthenticated()}`)
    console.log(`User: ${req.user}`)
    if (req.isAuthenticated()){
        let data = await Toppings.find({})
        res.render('dashboard', {user: req.user, title: 'Dashboard', data: data})
    } else {
        res.redirect('/')
    }  
})

module.exports = router