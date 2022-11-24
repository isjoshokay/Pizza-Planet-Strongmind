const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

router.get('/', (req, res, next) => {
    // if user is authenticated, render dashboard with data. Otherwise, show login. 
    res.render('login')
})




router.post('/POSTDATA', (req, res, next) => {
    if (req.body){
        // Do the call to mongodb here
        let toppings = [
            {id: 'item1', name: 'Chicken', type: 'Meat', price: "1.50", img: '/images/pepperoni.png', createdby: 'jpeoples'},
            {id: 'item1', name: 'Sausage', type: 'Meat', price: "1.50", img: '/images/pepperoni.png', createdby: 'jpeoples'},
            {id: 'item1', name: 'Pepperoni', type: 'Meat', price: "2.00", img: '/images/pepperoni.png', createdby: 'jpeoples'},
            {id: 'item1', name: 'Chicken', type: 'Meat', price: "1.50", img: '/images/pepperoni.png', createdby: 'jpeoples'},
            {id: 'item1', name: 'Sausage', type: 'Meat', price: "1.50", img: '/images/pepperoni.png', createdby: 'jpeoples'},
            {id: 'item1', name: 'Pepperoni', type: 'Meat', price: "2.00", img: '/images/pepperoni.png', createdby: 'jpeoples'},
            {id: 'item1', name: 'Chicken', type: 'Meat', price: "1.50", img: '/images/pepperoni.png', createdby: 'jpeoples'},
            {id: 'item1', name: 'Sausage', type: 'Meat', price: "1.50", img: '/images/pepperoni.png', createdby: 'jpeoples'},
            {id: 'item1', name: 'Pepperoni', type: 'Meat', price: "2.00", img: '/images/pepperoni.png', createdby: 'jpeoples'},
            {id: 'item1', name: 'Chicken', type: 'Meat', price: "1.50", img: '/images/pepperoni.png', createdby: 'jpeoples'},
            {id: 'item1', name: 'Sausage', type: 'Meat', price: "1.50", img: '/images/pepperoni.png', createdby: 'jpeoples'},
            {id: 'item1', name: 'Pepperoni', type: 'Meat', price: "2.00", img: '/images/pepperoni.png', createdby: 'jpeoples'},
            {id: 'item1', name: 'Chicken', type: 'Meat', price: "1.50", img: '/images/pepperoni.png', createdby: 'jpeoples'},
            {id: 'item1', name: 'Sausage', type: 'Meat', price: "1.50", img: '/images/pepperoni.png', createdby: 'jpeoples'},
            {id: 'item1', name: 'Pepperoni', type: 'Meat', price: "2.00", img: '/images/pepperoni.png', createdby: 'jpeoples'},
            {id: 'item1', name: 'Chicken', type: 'Meat', price: "1.50", img: '/images/pepperoni.png', createdby: 'jpeoples'},
            {id: 'item1', name: 'Sausage', type: 'Meat', price: "1.50", img: '/images/pepperoni.png', createdby: 'jpeoples'},
            {id: 'item1', name: 'Pepperoni', type: 'Meat', price: "2.00", img: '/images/pepperoni.png', createdby: 'jpeoples'},
        ]
        res.render('dashboard', {
            title: 'Dashboard', 
            data: toppings,
            user: {
                username: 'jpeoples',
                fname: 'Joshua',
                lname: 'Peoples'
            }
        })
    } else {
        console.log('There was no data')
    }
    
})

module.exports = router