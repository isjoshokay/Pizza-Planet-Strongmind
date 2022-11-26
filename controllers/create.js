const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const Toppings = require('../models/toppings')
const Pizzas = require('../models/pizzas')
let success = true
const setToppingImage = (type) => {
    if (type == 'Sauce'){
        return './images/tomato.png'
    } else if (type == 'Cheese'){
        return './images/shredded-cheese.png'
    } else if (type == 'Veggies') {
        return './images/mushrooms-generic.png'
    } else if (type == 'Meat'){
        return './images/pepperoni.png'
    }
}

router.get('/', async (req, res, next) => {
    // In order to access this page, the user must be authenticated. That user's data will be passed to the template. 
    // depending on the type of user, a different page is rendered.
    if (req.isAuthenticated()){
        const toppings = await Toppings.find()
        // const pizzas = await Pizzas.find()
        if (req.user.permissions == 'Owner'){
            // Owner needs read+write access to toppings and read access to pizzas.
            res.render('create', {user: req.user, toppings: toppings, title: 'Create', success: success})
        } else if (req.user.permissions == 'Chef'){
            // Chef needs read access to toppings and read+write access to pizzas. 
            console.log(toppings)
            res.render('create-pizza', {user:req.user, toppings: toppings, pizzas: pizzas, success: success})
        }
    } else {
        res.redirect('/')
    }
})
router.post('/submit-topping', async (req, res, next) => {
    const newTopping = {
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        img: setToppingImage(req.body.type),
        createdby: req.user.username
    }
    // No duplicate toppings
    let duplicate = await Toppings.findOne({
        name: newTopping.name
    })
    if (duplicate){
        console.log('Duplicate found!', duplicate)
        success = false
        res.redirect('.')
    } else {
        await Toppings.create(newTopping)
        res.redirect('..')
    }
    
})
router.post('/update', (req, res, next) => {
    await
})
router.post('/delete', async (req, res, next) => {
    await Toppings.findByIdAndDelete(req.body.id)
    res.redirect('..')
})

module.exports = router