import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'

const JoinQuiz = () => {
  const location = useLocation()
  const { quizData } = location.state || {}

  const [name, setName] = useState('')
  const [gameKey, setGameKey] = useState('')

  const handleJoin = () => {
    // Handle the join logic here
    console.log('Name:', name)
    console.log('Game Key:', gameKey)
  }

  return (
    <Container className="mt-5">
      <Form>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGameKey">
          <Form.Label>Game Key:</Form.Label>
          <Form.Control
            type="text"
            value={gameKey}
            onChange={(e) => setGameKey(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleJoin}>
          Join In
        </Button>
      </Form>
    </Container>
  )
}

export default JoinQuiz
