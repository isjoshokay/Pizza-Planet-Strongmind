const express = require('express')
const router = express.Router()


router.get('/', (req, res, next) => {
    res.render('login')
})


let items = [
    {name: 'item1', price: '100'},
    {name: 'item2', price: '150'}
]
router.post('/POSTDATA', (req, res, next) => {
    if (req.body){
        console.log(req.body)
    } else {
        res.send('There was no data')
    }
    res.render('dashboard', {
        title: 'Dashboard', 
        items
    })
})

module.exports = router