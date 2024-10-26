// GamesService.js
const Players = require('../database/models/Players') // Adjust the path as necessary

const joinGame = async (gameKey, playerName) => {
  // Check if existing player
  const existingPlayer = await Players.findOne({ gameKey, playerName })
  if (existingPlayer) {
    return existingPlayer
  }

  const player = await Players.create({
    gameKey,
    playerName,
    playerScore: 0,
  })
  console.log('Player joined:', player)
  return player
}

module.exports = {
  joinGame,
}
