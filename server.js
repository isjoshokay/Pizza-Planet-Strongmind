// Import modules
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const Users = require('./models/users')
const bcrypt = require('bcrypt')
require('dotenv').config()

// Access forms inside of req
app.use(express.urlencoded({extended: false}))

// MongoDB
mongoose.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true},
    () => {
      console.log('Connected to MongoDB')
    })
const db = mongoose.connection
db.on('error', (err) => console.error(err))

// Set EJS as the view engine
app.set('view engine', 'ejs')

// Middleware
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// Error Handler Middleware
const errorHandler = (err, req, res, next) => {
    if (err){
        res.send('There was an error. Please try again.')
    }
}


// Routes
// This is temporary, when I add passport this will be checking for authentication before going to login
app.use('/dashboard', require('./controllers/dashboard'))
app.use('/create', require('./controllers/create'))
app.get('/', (req, res, next) => {
    // if user is authenticated, render dashboard with data. Otherwise, show login. 
    res.render('login', {success: false})
})
app.post('/login-user', async (req, res, next) => {
    // If the user exists, compare passwords. If not, redirect to login 
    let userExists = await Users.findOne({username: req.body.username})
    if (userExists) {
        const passwordMatch = await bcrypt.compare(req.body.password, userExists.password)
        if (passwordMatch){
            isAuthenticated = true
            res.redirect(`dashboard`)
        }
    } 
})

app.get('/new-user', (req, res, next) => {
    res.render('newuser', {success: true})
})
app.post('/new-user', async (req, res, next) => {
    try {
        let duplicateUser = await Users.findOne({
            username: req.body.username
        })
        if (duplicateUser){
            console.log('That username already exists')
            res.render('newuser', {success: false})
        } else {
            console.log('User does not exist. Creating new user.')
            const hashPass = await bcrypt.hash(req.body.password, 10)
            Users.create({
                username: req.body.username,
                fname: req.body.fname,
                lname: req.body.lname || '',
                password: hashPass,
                permissions: req.body.permissions
            })
            res.render('login', {success: true})
        }
    } catch {
        console.log('error')
    }
})

app.get('/index', (req, res, next) => {
    res.render('index')
})
app.get('/test', (req, res, next) => {
    res.render('visualtest')
    console.log('Test styles')
})

app.use(errorHandler)
const PORT = 3000
app.listen(PORT) 
