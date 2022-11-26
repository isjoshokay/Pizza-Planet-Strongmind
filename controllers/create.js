const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const Toppings = require('../models/toppings')
const Pizzas = require('../models/pizzas')
const ErrorMessage = require('../Errors')

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
            res.render('create', {user: req.user, title: 'Create'})
        } else if (req.user.permissions == 'Chef'){
            // Chef needs read access to toppings and read+write access to pizzas. 
            console.log(toppings)
            res.render('create-pizza', {user:req.user, toppings: toppings})
        }
    } else {
        res.redirect('/create')
    }
})
router.post('/submit-topping', async (req, res, next) => {
    try{
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
            throw new Error
        } else {
            await Toppings.create(newTopping)
            res.redirect('..')
        }
    } catch(err) {
        next(ErrorMessage.badRequest('A topping by that name already exists'))
    }
})

router.post('/update', async (req, res, next) => {
    // find topping and check to see if it exists. If it does, hydrate the create page with the data of that topping
    // the topping cannot be a duplicate of an entirely different topping (by id)
    try{
        foundTopping = await Toppings.findById(req.body.id)
        if (!foundTopping) {
            throw new Error('The topping no longer exists')
        } else {
            let duplicateByName = await Toppings.findOne({
                name: req.body.name
            })
            if (duplicateByName){
                if (duplicateByName.id != req.body.id) {
                    console.log('Duplicate found!', duplicateByName)
                    throw new Error('A topping by that name already exists')
                }
            } 
            await Toppings.findOneAndUpdate(req.body.id, {
                name: req.body.name,
                type: req.body.type,
                price: req.body.price,
                img: setToppingImage(req.body.type),
                createdby: req.body.createdby
            })  
            res.redirect('back')
        
        }
    } catch(err) {
        next(ErrorMessage.badRequest(err))
    }
    
})
router.post('/delete', async (req, res, next) => {
    await Toppings.findByIdAndDelete(req.body.id)
    res.redirect('..')
})

module.exports = router