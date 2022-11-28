/*
Built by Joshua Peoples for for Strongmind
*/

// Import modules
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const Users = require('./models/users')
const passport = require('passport')
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

// Misc Middleware
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


// Session setup
// Session Store in MongoDB
const MongoStore = require('connect-mongo')
const ErrorMessage = require('./Errors')
const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,
    dbName: 'pizzaplanet'
})
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))
// Passport Authentication
require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())
// Routes
app.use('/dashboard', require('./controllers/dashboard'))
app.use('/create', require('./controllers/create'))

app.get('/', (req, res, next) => {
    // if user is authenticated, render dashboard with data. Otherwise, show login (this will be consistent among many routes)
    if (req.isAuthenticated()){
        res.redirect('/dashboard')
    } else {
        res.render('login')
    }
})
app.get('/invalid-login', (req, res, next) => {
    if (req.isAuthenticated()){
        res.redirect('/dashboard')
    } else {
        res.render('error', {message: 'Your credentials were...not credentialing (invalid)'})
    }
})

// Log in, log out routes
app.post('/login-user', passport.authenticate('local', {failureRedirect: '/invalid-login', successRedirect: '/dashboard'}))
app.get('/logout', (req, res, next) => {
    if (req.isAuthenticated()){
        req.logout(err => {
            req.session.destroy(err => {
                if (err) {
                    next(err)
                }
                res.clearCookie('connect.sid')
                res.redirect('/')
            })
        })
    } else {
        res.redirect('/')
    }
})
app.get('/new-user', (req, res, next) => {
    res.render('newuser', {success: true})
})
app.post('/new-user', async (req, res, next) => {
    let duplicateUser = await Users.findOne({
        username: req.body.username
    })
    if (duplicateUser){
        res.render('newuser', {success: false})
    } else {
        const hashPass = await bcrypt.hash(req.body.password, 10)
        Users.create({
            username: req.body.username,
            fname: req.body.fname,
            lname: req.body.lname || '',
            password: hashPass,
            permissions: req.body.permissions
        })
        res.render('login', {invalid: false})
    }
})

app.get('/error', (req,res,next) => {
    res.render('error', {message: app.locals.errormsg})
})
// Error Handler
app.use((err, req, res, next) => {
    console.error(err)
    if (err instanceof ErrorMessage){
        app.locals.errormsg = err.message
        res.redirect('/error')
        return
    }
    res.status(500).json('something went wrong')
})
const PORT = process.env.PORT || 3000
app.listen(PORT) 
