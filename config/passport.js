const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('../models/users')
const bcrypt = require ('bcrypt')

const customFields = {
    usernameField: '',
    passwordField: ''
}

// Verify user
const verifyCallback = async (username, password, done) => {
    console.log('verifying user')
    // find matching username
    await Users.findOne({
        username: username
    }).then( async (user) => {
        // if there is no user, give an error
        if (!user) {
            console.log('no user found')
            return done(null, false)} // null = not an error, false = no user found

        // validate password (returns t/f)
        const isValid = await bcrypt.compare(password, user.password)
        if (isValid) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    }).catch((err) => {
        console.log('There is an error')
        done(err)
    })
}
// Define strategy
const strategy = new LocalStrategy(customFields, verifyCallback)
passport.use(strategy)

// Session handling
passport.serializeUser((userId, done) => {
    // mongodb find user by id here
    Users.findById(userId)
        .then((user) => {
            done(null, user)
        })
        .catch(err => done(err))
})

passport.deserializeUser((userId, done) => {
    Users.findById(userId)
        .then((user) => {
            done(null, user)
        })
        .catch(err => done(err))
})