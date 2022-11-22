// Import modules
const express = require('express')
const app = express()

// Set EJS as the view engine
app.set('view engine', 'ejs')

app.use(express.static("public"))

// First route
app.get('/', (req, res, next) => {
    res.render('index', {data: "world"})
    console.log('server works')
})

const PORT = false || 3000
app.listen(PORT)

const sum = (a, b) => {
    return a + b
}

module.exports = sum