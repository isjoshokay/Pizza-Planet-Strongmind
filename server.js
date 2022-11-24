// Import modules
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
require('dotenv').config()

// MongoDB
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, () => {
    console.log('Connected to MongoDB')
})

// Set EJS as the view engine
app.set('view engine', 'ejs')

// Middleware
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
// Routes
// This is temporary, when I add passport this will be checking for authentication before going to login
app.use('/', require('./controllers/login'))
app.use('/dashboard', require('./controllers/dashboard'))

app.get('/index', (req, res, next) => {
    res.render('index')
    console.log('hooray the server works')
})
app.get('/test', (req, res, next) => {
    res.render('visualtest')
    console.log('Test Mode')
})


const PORT = 3000
app.listen(PORT) 