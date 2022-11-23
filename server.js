// Import modules
const express = require('express')
const app = express()

// Set EJS as the view engine
app.set('view engine', 'ejs')

// Middleware
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
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
})

app.post('/POSTDATA', (req, res, next) => {
    if (req.body){
        console.log(req.body)
    } else {
        res.send('There was no data')
    }
    res.redirect('/dashboard')
})
app.get('/dashboard', (req, res, next) => {
    res.send('Dashboard does not exist yet')
})

const PORT = false || 3000
app.listen(PORT) 