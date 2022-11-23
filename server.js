// Import modules
const express = require('express')
const app = express()

// Set EJS as the view engine
app.set('view engine', 'ejs')

// Middleware
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// This is temporary, when I add passport this will be checking for authentication before going to login
app.use('/', require('./controllers/login'))
// Routes
app.get('/index', (req, res, next) => {
    res.render('index')
    console.log('hooray the server works')
})
app.get('/test', (req, res, next) => {
    res.render('visualtest')
    console.log('Test Mode')
})
app.get('/dashboard', (req, res, next) => {
    res.send('Dashboard does not exist yet')
})

const PORT = false || 3000
app.listen(PORT) 