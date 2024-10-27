const mongoose = require('mongoose')
require('dotenv').config()

const MAX_RETRIES = 5
const RETRY_DELAY = 5000 // in milliseconds

const connectDB = async () => {
  let retries = 0

  while (retries < MAX_RETRIES) {
    try {
      console.log('Connecting to MongoDB...')
      console.log('DATABASE_URL:', process.env.DATABASE_URL)
      await mongoose.connect(process.env.DATABASE_URL, {
        authSource: 'quizGameDB',
      })

      console.log('MongoDB Connected...')
      break // Exit the loop if connection is successful
    } catch (err) {
      retries += 1
      console.error(`Connection attempt ${retries} failed: ${err.message}`)

      if (retries < MAX_RETRIES) {
        console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`)
        await new Promise((res) => setTimeout(res, RETRY_DELAY))
      } else {
        console.error('Max retries reached. Exiting...')
        process.exit(1)
      }
    }
  }
}

module.exports = connectDB
