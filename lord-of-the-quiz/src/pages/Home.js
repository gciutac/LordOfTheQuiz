import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [quizData, setQuizData] = useState(null)

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

  const handleStartQuizButtonClick = () => {
    const gameid = quizData.gameId
    navigate(`/game/${gameid}`, { state: { quizData } })
  }

  const handleJoinQuizButtonClick = () => {
    const gameid = quizData.gameId
    navigate(`/join/${gameid}`, { state: { quizData } })
  }

  return (
    <div>
      {quizData && (
        <Card style={{ width: '18rem' }} className="shadow-sm rounded">
          <Card.Img
            variant="top"
            src="/Hedwig_Snowy_Owl_PM.webp"
            style={{ width: '5rem' }}
          />
          <Card.Body>
            <Card.Title className="text-center">{quizData.name}</Card.Title>
            <Button
              variant="primary"
              className="text-center"
              onClick={handleStartQuizButtonClick}
            >
              Start Quiz
            </Button>
            <Button
              variant="info"
              className="text-center m-2"
              onClick={handleJoinQuizButtonClick}
            >
              Join Quiz
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  )
}

export default Home
