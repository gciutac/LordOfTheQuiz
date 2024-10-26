const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb://QuizGameUser:password@localhost:27017/quizGameDB',
      {
        authSource: 'quizGameDB',
      }
    )

    console.log('MongoDB Connected...')
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = connectDB
