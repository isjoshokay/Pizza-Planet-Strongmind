const express = require('express')
const router = express.Router()

const toppingsData = [

]

router.get('/', (req, res, next) => {
    res.render('login')
})



router.post('/POSTDATA', (req, res, next) => {
    if (req.body){
        console.log(req.body)
    } else {
        res.send('There was no data')
    }
    res.render('dashboard', {title: 'Dashboard'})
})

module.exports = router