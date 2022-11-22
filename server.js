// Import modules
const express = require('express')
const app = express()

// Set EJS as the view engine
app.set('view engine', 'ejs')

app.use(express.static("public"))

// Routes
app.get('/', (req, res, next) => {
    res.render('index')
    console.log('server works')
})

app.get('/login', (req, res, next) => {
    res.render('login')
    console.log('you are on the login page')
})

const PORT = false || 3000
app.listen(PORT)

const sum = (a, b) => {
    return a + b
}

module.exports = sum