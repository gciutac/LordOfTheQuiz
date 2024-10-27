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

const GameOver = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { quizData } = location.state || {}
  const user = useContext(UserContext).user
  const [error, setError] = useState(null)
  const [playersData, setPlayersData] = useState([])

  const fetchData = async () => {
    try {
      const response = await fetch('/MockDataScores.json')
      if (!response.ok) {
        setError('Failed to fetch quiz data')
      }
      const data = await response.json()
      setPlayersData(data)
    } catch (error) {
      setError(error.message)
      console.error('Error fetching quiz data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <Container className="d-flex vh-100 align-items-center justify-content-center">
        <table className="d-flex vh-100 align-items-center justify-content-center">
          <tbody>
            <tr>
              <td>
                <Card style={{ width: '18rem' }} className="shadow-sm rounded">
                  <Card.Title className="text-center">
                  Game Over
                  </Card.Title>
                  <Card.Text className="text-center">
                    The winner is 
                  </Card.Text>
                    <Card.Title style={{ fontSize: '30px', lineHeight: '50px' }} className="text-center">
                      Gheorghe <br /> &#129395; &#129321; &#129395;
                    </Card.Title>
                  <Card.Body className='justify-content-center'>
                    <Card.Title>Score board</Card.Title>
                    <div className='d-flex justify-content-center'>
                      <table>
                        {playersData.map((player) => (
                          <tr style={{ borderTop: "1px solid white", borderBottom: '1px solid white', padding: '8px'}}>
                            <td style={{ paddingRight: '10px'}}>{player.playerName}</td>
                            <td>{player.playerScore}</td>
                          </tr>
                        ))}
                      </table>
                    </div>
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
                  <Button
                    variant="primary"
                    className="text-center"
                  >
                    Home
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Container>
    </div>
  )
}

export default GameOver
