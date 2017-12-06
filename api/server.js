const express = require('express')
const bodyParser = require('body-parser')
const authMiddleware = require('./middleware/auth')

const server = express()

// Middleware Plugins
server.use(bodyParser.json()) // Allows me to have JSON uploads (POST/PUT/PATCH)
server.use(authMiddleware.initialize) // Kick passport off

// Routes
server.use([
  require('./routes/products'),
  require('./routes/auth'),
])

// Start the server
server.listen(7000, (error) => {
  if (error) {
    console.error('Error starting', error)
  }
  else {
    console.log('Server started at http://localhost:7000/')
  }
})
