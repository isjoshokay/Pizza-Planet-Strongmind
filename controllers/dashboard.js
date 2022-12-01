const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const Toppings = require('../models/toppings')
const Pizzas = require('../models/pizzas')
const ErrorMessage = require('../Errors')


router.get('/', async (req, res, next) => {
    // In order to access this page, the user must be authenticated. That user's data will be passed to the template. 
    // Depending on the type of user, a different page is rendered.
    try {
    if (req.isAuthenticated()){
        let toppings = await Toppings.find().populate('users').sort({type: -1})
        let pizzas = await Pizzas.find().populate('toppings').populate('users')
        if (req.user.permissions == 'Owner'){
            res.render('dashboard', {user: req.user, title: 'Cosmic Toppings', data: toppings, pizzas: pizzas})
        } else if (req.user.permissions == 'Chef'){
            res.render('chefdashboard', {user: req.user, title: 'Galactic Pizzas', toppings: toppings, pizzas: pizzas})
        }
    } else {
        res.redirect('/')
    }} catch(err) {
        next(ErrorMessage.badRequest('Something went wrong.'))
    }
})

module.exports = router