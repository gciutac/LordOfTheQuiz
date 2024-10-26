// GamesService.js
const Games = require('../database/models/Games') // Adjust the path as necessary

const createGame = async (gameId) => {
  // Generate random 5-digit number
  const randomKey = Math.floor(10000 + Math.random() * 90000)
  const result = await Games.create({
    gameId,
    gameKey: `${randomKey}`,
    gameStatus: 'NEW',
    currentQuestion: 0,
    numberOfQuestions: 5,
  })
  console.log('Game created:', result)
  return result
}

const nextQuestion = async (gameKey) => {
  const game = await Games.findOne({ gameKey })

  if (!game) {
    return { error: 'Game not found' }
  }

  if (game.gameStatus === 'COMPLETED') {
    return game
  }

  if (game.currentQuestion === game.numberOfQuestions) {
    game.gameStatus = 'COMPLETED'
    game.save()
    console.log('Game completed:', game)
    return game
  }

  game.currentQuestion += 1
  if (game.currentQuestion === game.numberOfQuestions) {
    game.gameStatus = 'LAST_QUESTION'
  }
  game.save()
  console.log('Next question:', game)
  return game
}

module.exports = {
  createGame,
  nextQuestion,
}
