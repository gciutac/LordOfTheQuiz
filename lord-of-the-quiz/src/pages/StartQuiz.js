import React, { useContext, useState, useEffect, ProgressBar } from 'react'
import MultipleChoiseQuestion from './components/MultipleChoiseQuestion'
import { useLocation, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { GameContext } from '../context/GameContext'
import { Button, Container } from 'react-bootstrap'
import { io } from 'socket.io-client'

const StartQuiz = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { quizData } = location.state || {}
  const user = useContext(UserContext).user
  const game = useContext(GameContext).game
  const [error, setError] = useState(null)
  const [gameData, setGameData] = useState(null)
  const [reload, setReload] = useState(false)

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

  const questionIncrease = () => {
    // Handle the question increase logic here
    nextQuestion()
    console.log('Increase question')
    fetchGame() //this should trigger a refresh
    if(gameData.gameStatus === 'COMPLETED'){
      console.log('End game')
      navigate('/gameover')
    }
  }

  const fetchGame = async () => {
    try {
      console.log('Fetching game:', game)
      const response = await fetch(`/api/game/${game.gameKey}`)
      if (!response.ok) {
        setError('Failed to fetch game')
      }
      const data = await response.json()
      setGameData(data)
    } catch (error) {
      setError(error.message)
      console.error('Error fetching game:', error)
    }
  }

  useEffect(() => {
    const socket = io('https://www.f39.site')
    socket.on('gameStatus', (data) => {
      console.log('Received game status:', data)

      if (data.gameStatus === 'RUNNING') {
        console.log('Start game')
        fetchGame()
      }

      if (data.gameStatus === 'COMPLETED') {
        console.log('End game')
        navigate('/gameover')
      }
    })
    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    fetchGame()
  }, [])

  return (
    <div>
      <Container className="d-flex vh-100 align-items-center justify-content-center">
        <table className="d-flex vh-100 align-items-center justify-content-center">
          <tbody>
            <tr>
              <td>
                {quizData && gameData && gameData.currentQuestion > 0 && (
                  <MultipleChoiseQuestion
                    id={quizData.questions[gameData.currentQuestion - 1].id}
                    text={quizData.questions[gameData.currentQuestion - 1].text}
                    media={
                      quizData.questions[gameData.currentQuestion - 1].media.content
                    }
                    answers={quizData.questions[gameData.currentQuestion - 1].answers}
                  />
                )}
              </td>
            </tr>
            <tr>
              <td>
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ margin: '10px' }}
                >   {user.userType === 'master' && (
                      <Button
                        variant="primary"
                        className="text-center"
                        onClick={questionIncrease}
                      >
                        Next
                      </Button>
                      
                    )}
                    {user.userType === 'player' && (
                      <><Button
                        variant="primary"
                        className="text-center"
                      >
                        50/50
                      </Button>
                      <Button
                        variant="primary"
                        className="text-center"
                      >
                          Hint
                      </Button>
                      <Button
                        variant="primary"
                        className="text-center"
                      >
                          Copy &#129323;
                      </Button>
                      </>
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

export default StartQuiz
