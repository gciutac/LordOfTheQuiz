const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 5552

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

app.get('/api/create-game/:gameId', (req, res) => {
  const { gameId } = req.params
  // Generate randowm 5-digit number
  const randomKey = Math.floor(10000 + Math.random() * 90000)
  res.json({ gameKey: `${randomKey}` })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
