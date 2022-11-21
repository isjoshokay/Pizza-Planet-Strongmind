const express = require('express')
const app = express()

app.set('view engine', 'ejs')


app.get('/', (req, res, next) => {
    res.render('index', {data: "world"})
})

app.listen(3000)