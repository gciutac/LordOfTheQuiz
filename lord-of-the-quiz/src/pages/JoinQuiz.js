import React, { useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Form, Button, Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import { GameContext } from '../context/GameContext';

const JoinQuiz = () => {
  const { user, updateUser } = useContext(UserContext);
  const updateGame = useContext(GameContext).updateGame;
  
  const [error, setError] = useState(null)
  
  const [quizData, setQuizData] = useState(null)
  const [gameData, setGameData] = useState(null)
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

  const createGame = async () => {
    try {
      const response = await fetch(`/api/create-game/${quizData.gameId}`)
      if (!response.ok) {
        setError('Failed to fetch quiz data')
      }
      const data = await response.json()
      setGameData(data)
      updateGame({ gameId: data.gameId, gameKey: data.gameKey});
    } catch (error) {
      console.error('Error creating quiz:', error)
    }
  }

  const joinGame = async () => {
    try {
      const response = await fetch(`/api/join-game/${gameKey}/player/${name}`)
      if (!response.ok) {
        setError('Failed to join game data')
      }
    } catch (error) {
      console.error('Error joining game:', error)
    }
  }

  const fetchGame = async () => {
    try {
      const response = await fetch(`/api/game/${gameKey}`)
      if (!response.ok) {
        setError('Failed to fetch game data')
      }
      const data = await response.json()
      setGameData(data)
      updateGame({ gameId: data.gameId, gameKey: data.gameKey });
      console.log('gameData:', data)
    } catch (error) {
      console.error('Error fetching game:', error)
      
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  const handleJoin = async() => {
    // Handle the join logic here
    joinGame()
    await fetchGame()
    updateUser({ username: name, userType: user.userType });
    console.log('Name:', name)
    console.log('Game Key:', gameKey)
    navigate(`/lobby`, { state: { quizData } })


  }

  const handleCreate = async() => {
    // Handle the create logic here
    await createGame()
    console.log('gameData:', gameData)
    updateUser({ username: name, userType: user.userType });
    console.log('Name:', name)
    navigate(`/lobby`, { state: { quizData } })
  }

  return (
    <Container className="d-flex vh-100 align-items-center justify-content-center" >
      <Card className="shadow-sm rounded">
        <Card.Body>
          <div className="d-flex §mt-3 justify-content-center">
            <Card.Title className="question-title">Register</Card.Title>
          </div>
          {error && <p>{error}</p>}
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
                <Form.Label>Game Code:</Form.Label>
                <Form.Control
                  type="text"
                  value={gameKey}
                  onChange={(e) => setGameKey(e.target.value)}
                />
              </Form.Group>
            )}
            <div className="d-flex §mt-3 justify-content-center">
            {user.userType === 'master' && (
              <Button variant="primary" onClick={handleCreate}>
                Create Quiz
              </Button>
            )}
              {user.userType === 'player' && (
                <Button variant="primary" onClick={handleJoin}>
                Join
              </Button>
              )}
            </div>
            
          </Form>
        </Card.Body>
      </Card>
      
    </Container>
  )
}

export default JoinQuiz
