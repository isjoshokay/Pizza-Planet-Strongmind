// Import modules
const express = require('express')
const app = express()

// Set EJS as the view engine
app.set('view engine', 'ejs')

app.use(express.static("public"))

// Routes
app.get('/', (req, res, next) => {
    res.render('index')
    console.log('hooray the server works')
})

app.get('/test', (req, res, next) => {
    res.render('visualtest')
    console.log('Test Mode')
})

app.get('/login', (req, res, next) => {
    res.render('login') 
    console.log('user is on the login page')
})

const PORT = false || 3000
app.listen(PORT)