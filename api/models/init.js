const mongoose = require('mongoose')

// Use the Promise functionality built into Node.js
mongoose.Promise = global.Promise

// Connect to our local database
mongoose.connect(
  process.env.MONGO_URI,
  { useMongoClient: true }
)
  .then(() => {
    console.log('Successfully connected to database')
  })
  .catch((error) => {
    // If there was an error connecting to the database
    console.error('Error connecting to MongoDB database', error)
  })

module.exports = mongoose