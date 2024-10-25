const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 5552

app.get('/', (req, res) => {
  res.send('Quiz!')
})

app.get('/api/quiz', (req, res) => {
  const filePath = path.join(__dirname, 'quiz.json')
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading quiz file')
      return
    }
    res.json(JSON.parse(data))
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
