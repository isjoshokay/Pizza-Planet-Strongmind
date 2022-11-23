const express = require('express')
const router = express.Router()

router.get('/dashboard', (req, res, next) => {
    res.send('Dashboard does not exist yet')
})

module.exports = router