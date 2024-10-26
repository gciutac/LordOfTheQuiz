import React, { useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import { GameContext } from '../context/GameContext';

const JoinQuiz = () => {
  const { user, updateUser } = useContext(UserContext);
  const { game, updateGame } = useContext(GameContext);
  
  const location = useLocation()
  const [error, setError] = useState(null)
  
  const [quizData, setQuizData] = useState(null)
  const navigate = useNavigate()
  // const { gameid } = location.state || {}

  const [name, setName] = useState('')
  const [gameKey, setGameKey] = useState('')

  const fetchData = async () => {
    try {
      const response = await fetch('/api/quiz')
      if (!response.ok) {
        setError('Failed to fetch quiz data')
      }
      const data = await response.json()
      setQuizData(data)
    } catch (error) {
      setError(error.message)
      console.error('Error fetching quiz data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  const handleJoin = () => {
    // Handle the join logic here
    updateUser({ username: name, userType: user.userType });
    updateGame({ gameKey: gameKey, gameId:  quizData.gameId });
    console.log('Name:', name)
    console.log('Game Key:', gameKey)
    navigate(`/game/${gameKey}`, { state: { quizData } })
  }

  const handleCreate = () => {
    // Handle the create logic here
    const gameKey = Math.floor(10000 + Math.random() * 90000) // Generate random 5-digit number
    updateGame({ gameKey: gameKey, gameId:  quizData.gameId });
    updateUser({ username: name, userType: user.userType });
    console.log('Name:', name)
    navigate(`/game/${gameKey}`, { state: { quizData } })
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
        {user.userType === 'player' && (
          <Form.Group className="mb-3" controlId="formGameKey">
            <Form.Label>Game Key:</Form.Label>
            <Form.Control
              type="text"
              value={gameKey}
              onChange={(e) => setGameKey(e.target.value)}
            />
          </Form.Group>
        )}

        {user.userType === 'master' && (
          <Button variant="primary" onClick={handleCreate}>
            Create Quiz
          </Button>
        )}
        {user.userType === 'player' && (
          <Button variant="primary" onClick={handleJoin}>
          Join In
        </Button>
        )}
      </Form>
    </Container>
  )
}

export default JoinQuiz
