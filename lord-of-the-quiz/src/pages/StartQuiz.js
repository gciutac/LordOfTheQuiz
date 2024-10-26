import React, { useContext, useState, useEffect } from 'react'
import MultipleChoiseQuestion from './components/MultipleChoiseQuestion'
import { useLocation, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { GameContext } from '../context/GameContext'
import { Button, Container} from 'react-bootstrap'
import { io } from 'socket.io-client';

const StartQuiz = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { quizData } = location.state || {}
  const user = useContext(UserContext).user;
  const game = useContext(GameContext).game;
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
  }

  const fetchGame = async () => {
    try {
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
    const socket = io('http://localhost:5553');
    socket.on('gameStatus', (data) => {
      console.log('Received game status:', data);
      
      if(data.gameStatus === 'RUNNING') {
        console.log('Start game')
        fetchGame()
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchGame()
  }, [])

  return (
    <div>
      <Container className="d-flex vh-100 align-items-center justify-content-center">
        {quizData && gameData && gameData.currentQuestion>0 && (
          <MultipleChoiseQuestion
            id={quizData.questions[gameData.currentQuestion-1].id}
            text={quizData.questions[gameData.currentQuestion-1].text}
            media={quizData.questions[gameData.currentQuestion-1].media.content}
            answers={quizData.questions[gameData.currentQuestion-1].answers}
          />
        )}
        {user.userType === 'master' && (
          <Button 
          variant="primary"
          className="text-center" 
          onClick={questionIncrease}>
            Next
          </Button>
        )}
      </Container>
    </div>
  )
}

export default StartQuiz
