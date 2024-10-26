const mongoose = require('mongoose')

const GamesSchema = new mongoose.Schema({
  gameId: {
    type: Number,
    required: true,
  },
  gameKey: {
    type: String,
    required: true,
  },
  gameStatus: {
    type: String,
    enum: ['NEW', 'RUNNING', 'LAST_QUESTION', 'COMPLETED'],
    required: true,
  },
  currentQuestion: {
    type: Number,
    required: false,
  },
  numberOfQuestions: {
    type: Number,
    required: false,
  },
})

const Games = mongoose.model('Games', GamesSchema)

module.exports = Games
