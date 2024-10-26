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

const fetchGame = async (gameKey) => {
  const game = await Games.findOne({ gameKey })
  console.log('Game fetched:', game)
  return game
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
  console.log('before new check')
  if (game.gameStatus === 'NEW') {
    game.gameStatus = 'RUNNING'
    console.log('inside new check')
  }
  console.log('After new check')
  game.save()
  console.log('Next question:', game)
  return game
}

module.exports = {
  createGame,
  nextQuestion,
  fetchGame,
}
