const express = require('express')
const connectDB = require('./src/database/connectDB')
const Games = require('./src/database/models/Games')
const fs = require('fs')
const path = require('path')
const app = express()

const {
  createGame,
  nextQuestion,
  fetchGame,
} = require('./src/service/GameService')
const { joinGame } = require('./src/service/PlayerService')
const port = 5552
const { Server } = require('socket.io')

connectDB()

let gameContext
let clients = []

const gameDetails = {
  gameId: '',
  gameKey: '',
  gameStatus: 'not-started', // 'not-started', 'in-progress', 'completed'
  currentQuestion: 0,
  isLastQuestion: false,
  players: [],
}

const playerSchema = {
  name: '',
  score: 0,
  answers: [],
  is5050Used: false,
  isCopyUsed: false,
  isHintUsed: false,
}

const answer = {
  questionId: '',
  answerType: '', // 'choose', 'submit', 'copy', '5050'
  helpUser: '',
  playerAnswer: '',
  points: 0,
}

const io = new Server(5553, {
  cors: {
    origin: '*',
  },
})
app.get('/', (req, res) => {
  res.send('Quiz!')
})

app.get('/api/quiz', (req, res) => {
  const filePath = path.join(__dirname, 'myQuiz.json')
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading quiz file')
      return
    }
    res.json(JSON.parse(data))
  })
})

app.get('/api/game/:gamekey', async (req, res) => {
  const { gamekey } = req.params
  const result = await fetchGame(gamekey)
  console.log('Game fetched:', result)
  res.json(result)
})

// Used by the admin
app.get('/api/create-game/:gameId', async (req, res) => {
  const { gameId } = req.params
  const result = await createGame(gameId)
  console.log('Game created:', result)
  // reply to the API with the created Game
  res.json(result)
})

// Used by the admin
app.get('/api/next-question/:gameKey', async (req, res) => {
  const { gameKey } = req.params
  const updatedGame = await nextQuestion(gameKey)
  console.log('Next question:', updatedGame)
  io.emit('gameStatus', {
    gameStatus: updatedGame.gameStatus,
    currentQuestion: updatedGame.currentQuestion,
  })
  res.json(updatedGame)
})

// Used by the players
app.get('/api/join-game/:gameKey/player/:playerName', async (req, res) => {
  const { gameKey, playerName } = req.params

  const result = await joinGame(gameKey, playerName)
  console.log('Player joined:', result)
  res.json(result)
})

// Payer answers
app.post(
  '/api/answer/:gameKey/player/:playerName/question/:questionNumber',
  (req, res) => {
    const { gameKey, playerName, questionNumber } = req.params
    const player = gameContext.players.find((p) => p.name === playerName)
    const question = gameContext.questions[questionNumber]
    const playerAnswer = req.body.answer
    const playerPoints = 0

    if (playerAnswer === question.correctAnswer) {
      playerPoints = 10
    }

    player.score += playerPoints
    player.answers.push({
      questionId: question.id,
      playerAnswer,
      points: playerPoints,
    })

    console.log('Player answered:', gameContext)
    res.json({ gameContext })
  }
)
io.on('connection', (socket) => {
  console.log('A user connected')
  socket.on('gameStatus', (gameStatus) => {
    console.log('Game Status updated:', gameContext)
    io.emit('gameStatus', gameStatus)
  })
})

app.get('/api/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders() // flush the headers to establish SSE with client

  clients.push(res)

  // Send a heartbeat to keep the connection alive
  const keepAliveInterval = setInterval(() => {
    res.write(': keep-alive\n\n')
  }, 20000) // 20 seconds

  req.on('close', () => {
    clients = clients.filter((client) => client !== res)
  })
})

// Function to send events to all clients
const sendEventToAll = (id, type, data) => {
  clients.forEach((client) => {
    client.write(`id: ${id}\n`)
    client.write(`event: ${type}\n`)
    client.write(`data: ${JSON.stringify(data)}\n\n`)
  })
}

let eventId = 0
setInterval(() => {
  sendEventToAll(eventId++, 'message', { message: 'Hello, clients!' })
}, 5000)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
