import React, { useState, useContext, useEffect } from 'react'
import MultipleChoiseQuestion from './components/MultipleChoiseQuestion'
import { useLocation, useParams } from 'react-router-dom'
import {
  Container,
  Table,
  Button,
  Card,
  ListGroup
} from 'react-bootstrap'
import { io } from 'socket.io-client'
import { UserContext } from '../context/UserContext'
import { GameContext } from '../context/GameContext'
import { useNavigate } from 'react-router-dom'

const Lobby = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { quizData } = location.state || {}
  const user = useContext(UserContext).user
  const { game, updateGame } = useContext(GameContext)
  const [error, setError] = useState(null)
  const [playersData, setPlayersData] = useState([])

  const fetchPlayers = async () => {
    try {
      console.log('Fetching game:', game)
      const response = await fetch(`/api/players/${game.gameKey}`)
      if (!response.ok) {
        setError('Failed to fetch game')
      }
      const data = await response.json()
      setPlayersData(data)
      console.log('Players:', data)
    } catch (error) {
      setError(error.message)
      console.error('Error fetching game:', error)
    }
  }

  const nextQuestion = async () => {
    try {
      const response = await fetch(`/api/next-question/${game.gameKey}`)
      if (!response.ok) {
        setError('Failed to increase question')
      }
    } catch (error) {
      setError(error.message)
      console.error('Error increasing question:', error)
    }
  }

  useEffect(() => {
    const gameId = quizData?.gameId
    if (gameId) {
      fetch(`/api/create-game/${gameId}`)
        .then((response) => response.json())
        .then((data) =>
          updateGame({ gameId: quizData.gameId, gameKey: game.gameKey })
        )
        .catch((error) => console.error('Error fetching game key:', error))
    }
  }, [])

  useEffect(() => {
    console.log('useEffect called')
    const eventSource = new EventSource('/api/sse')

    eventSource.onopen = () => {
      console.log('Connection to server opened.')
    }

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log('Received event:', data)
    }

    eventSource.onerror = (err) => {
      console.error('EventSource failed:', err)
      eventSource.close()
    }

    return () => {
      console.log('Cleaning up EventSource')
      eventSource.close()
    }
  }, [])

  useEffect(() => {
    const socket = io('https://www.f39.site')
    socket.on('connect', () => {
      console.log('Connected to socket server')
    })
    socket.on('disconnect', () => {
      console.log('Disconnected from socket server')
    })
    socket.on('gameStatus', (data) => {
      console.log('Received game status:', data)

      if (data.gameStatus === 'RUNNING') {
        console.log('Start game')
        navigate(`/game`, { state: { quizData } })
      }
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    fetchPlayers()
  }, [])

  const handleStart = () => {
    // Handle the start logic here
    questionIncrease()
    console.log('Start game')
    navigate(`/game`, { state: { quizData } })
  }

  const questionIncrease = () => {
    // Handle the question increase logic here
    nextQuestion()
    console.log('Increase question')
  }

  return (
    <div>
      <Container className="d-flex vh-100 align-items-center justify-content-center">
        <table className="d-flex vh-100 align-items-center justify-content-center">
          <tbody>
            <tr>
              <td>
                <Card style={{ width: '18rem' }} className="shadow-sm rounded">
                  <Card.Title className="text-center">
                  Join: {game.gameKey}
                  </Card.Title>
                  <Card.Text className="text-center">
                    {quizData?.name}
                  </Card.Text>
                  <Card.Img
                    variant="top"
                    src="/FlvdvsTq_400x400.jpg"
                    style={{ width: '10rem' }}
                  />
                  <Card.Body className='justify-content-center'>
                    <Card.Title>Players</Card.Title>
                    <ListGroup>
                        {playersData.map((player) => (
                          <ListGroup.Item className="loby-list-item">
                            {player.playerName}
                          </ListGroup.Item>
                        ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </td>
            </tr>
            <tr>
              <td>
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ margin: '10px' }}
                >
                  {user.userType === 'master' && (
                    <Button
                      variant="primary"
                      className="text-center"
                      onClick={handleStart}
                    >
                      Start Game
                    </Button>
                  )}
                  {user.userType === 'player' && (
                    <div>Waiting for quiz master to start...</div>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Container>
    </div>
  )
}

export default Lobby
