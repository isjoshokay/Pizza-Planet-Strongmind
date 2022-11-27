const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const Toppings = require('../models/toppings')
const ErrorMessage = require('../Errors')


router.get('/', async (req, res, next) => {
    // In order to access this page, the user must be authenticated. That user's data will be passed to the template. 
    // Depending on the type of user, a different page is rendered.
    if (req.isAuthenticated()){
        let toppings = await Toppings.find().populate('users')
        console.log(toppings)
        if (req.user.permissions == 'Owner'){
            res.render('dashboard', {user: req.user, title: 'All Toppings', data: toppings})
        } else if (req.user.permissions == 'Chef'){
            res.render('chefdashboard', {user: req.user, title: 'All Pizzas'})
        }
        
    } else {
        res.redirect('/')
    }  
})

module.exports = router