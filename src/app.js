const express = require('express')
const validate = require('./middleware/validate')
const executeQuery = require('./controller/controller')

// cache app
const app = express()

// parse raw text requests in JSON
app.use(express.json())

// use route
app.post('/api', validate, executeQuery)

module.exports = app
