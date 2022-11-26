const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const Toppings = require('../models/toppings')
const Pizzas = require('../models/pizzas')

const setImage = (item) => {
    // depending on the type specified when created, this is how the image path is set for a record in the database.
    // if item is a pizza, then the image will be whichever best fits.
}

router.get('/', async (req, res, next) => {
    // In order to access this page, the user must be authenticated. That user's data will be passed to the template. 
    // depending on the type of user, a different page is rendered.
    if (req.isAuthenticated()){
        const toppings = await Toppings.find()
        // const pizzas = await Pizzas.find()
        if (req.user.permissions == 'Owner'){
            // Owner needs read+write access to toppings and read access to pizzas.
            res.render('create', {user: req.user, toppings: toppings, title: 'Create'})
        } else if (req.user.permissions == 'Chef'){
            // Chef needs read access to toppings and read+write access to pizzas. 
            console.log(toppings)
            res.render('create-pizza', {user:req.user, toppings: toppings, pizzas: pizzas})
        }
    } else {
        res.redirect('/')
    }
    
})
router.post('/submit-topping', (req, res, next) => {
    console.log(req.body)
})


module.exports = router