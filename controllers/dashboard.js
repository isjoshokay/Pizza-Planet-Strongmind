const express = require('express')
const router = express.Router()
const Users = require('../models/users')

router.get('/', async (req, res, next) => {
    // In order to access this page, the user must be authenticated. That user's data will be passed to the template. 
    
    res.render('dashboard', {user: user, title: 'Dashboard', data: [{name: 'Pepperoni', type: 'Meat', price: '2.00', img: './images/pepperoni.png', createdby: user.username}]})
})


module.exports = router