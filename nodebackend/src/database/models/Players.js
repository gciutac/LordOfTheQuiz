const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true,
  },
  playerAnswer: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
})

const PlayersSchema = new mongoose.Schema({
  gameKey: {
    type: String,
    required: true,
  },
  playerName: {
    type: String,
    required: true,
  },
  playerScore: {
    type: Number,
    required: false,
  },
  playerAnswers: {
    type: [answerSchema],
    required: false,
  },
})

const Players = mongoose.model('Players', PlayersSchema)

module.exports = Players
