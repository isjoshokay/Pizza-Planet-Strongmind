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
    } else if (type == 'Garnish'){
        return './images/basil.png'
    }
}
const setPizzaImg = () => {
    // returns a random pizza image path. 
    let randint = Math.floor(Math.random() * (6 - 1) + 1)
    let imagePaths = ['./images/pizza-cheese.png', './images/pizza-meaty.png', './images/pizza-pep-veg.webp', './images/pizza-tomatobasil.png', './images/pizza-vegetarian.png']
    let selectedImg = ''
    if (randint == 1){
        selectedImg = imagePaths[0]
    } else if (randint == 2){
        selectedImg = imagePaths[1]
    } else if (randint == 3){
        selectedImg = imagePaths[2]
    } else if (randint == 4){
        selectedImg = imagePaths[3]
    } else {
        selectedImg = imagePaths[4]
    }
    return selectedImg
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
        // Change spaces to dashes and remove trailing spaces
        req.body.name = req.body.name.replace(/\s+$/, '').replace(/ /g, '-')
        
        const newTopping = {
            name: req.body.name,
            type: req.body.type,
            price: req.body.price,
            img: setToppingImage(req.body.type),
            users: req.user.id
        }
            // No duplicate toppings
        let duplicate = await Toppings.findOne({
            name: newTopping.name
        })
        if (duplicate){
            console.log('Duplicate found!', duplicate)
            throw new Error('A topping by that name already exists')
        } else {
            await Toppings.create(newTopping)
            res.redirect('..')
        }
    } catch(err) {
        next(ErrorMessage.badRequest(err))
    }
})
router.post('/submit-pizza', async (req, res, next) => {
    try{
        let formToppings = req.body.toppings.split(',')
        let toppings = await Toppings.find()
        // replacing topping name with its ID
        let price = 0
        const newPizza = {
            name: req.body.name,
            description: req.body.description,
            img: setPizzaImg(),
            users: req.user.id,
            toppings: formToppings.map(topping => {
                let id 
                toppings.forEach(obj => {
                    if (obj.name == topping){
                        id = obj.id
                        price += Number(obj.price)
                    }})
                return id}),
            price: (price + 5.00).toFixed(2)}
        // if duplicate, throw err, else add to newPizza to db. 
        await Pizzas.create(newPizza)
        res.redirect("..")
    } catch(err) {
        next(ErrorMessage.badRequest(err))
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
            console.log(req.body)
            // Fill spaces with dashes
            req.body.name = req.body.name.replace(/ /g, '-')
            await Toppings.findByIdAndUpdate(req.body.id, {
                name: req.body.name,
                type: req.body.type,
                price: req.body.price,
                img: setToppingImage(req.body.type)
            })  
            res.redirect('back')
        
        }
    } catch(err) {
        next(ErrorMessage.badRequest(err))
    }
    
})
router.post('/update-pizza', async (req, res, next) => {
    try {
        req.body.toppings = req.body.toppings.split(',')
        req.body.id = req.body.id[0]
        let toppings = await Toppings.find()
        let price = 0
        foundPizza = await Pizzas.findById(req.body.id)
        if (!foundPizza) {
            throw new Error('This pizza no longer exists')
        } else {
            //duplicate name logic and toppings list check here
            let duplicateByName = await Pizzas.findOne({
                name: req.body.name
            })
            if (duplicateByName){
                if (duplicateByName.id != req.body.id) {
                    console.log('Duplicate found!', duplicateByName)
                    throw new Error('A pizza by this name already exists.')
                }
            }
            await Pizzas.findByIdAndUpdate(req.body.id, {
                name: req.body.name,
                toppings: req.body.toppings.map(topping => {
                    let id 
                    toppings.forEach(obj => {
                        if (obj.name == topping){
                            id = obj.id
                            price += Number(obj.price)
                        }})
                    return id}),
                description: req.body.description,
                price: (price + 5.00).toFixed(2),
                users: req.user.id
            })
        }
    } catch(err){
        next(ErrorMessage.badRequest(err))
    }
})
router.post('/delete', async (req, res, next) => {
    await Toppings.findByIdAndDelete(req.body.id)
    res.redirect('..')
})
router.post('/delete-pizza', async (req, res, next) => {
    await Pizzas.findByIdAndDelete(req.body.id)
    res.redirect('..')
})

module.exports = router