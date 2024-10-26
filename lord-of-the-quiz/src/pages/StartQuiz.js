import React, { useState, useEffect } from 'react'
import MultipleChoiseQuestion from './components/MultipleChoiseQuestion'
import { useLocation, useParams } from 'react-router-dom'

const StartQuiz = () => {
  const location = useLocation()
  const { quizData } = location.state || {}
  const { gameid } = useParams()

  const [gameKey, setGameKey] = useState('')

  useEffect(() => {
    const gameId = quizData?.gameId
    if (gameId) {
      fetch(`/api/create-game/${gameId}`)
        .then((response) => response.json())
        .then((data) => setGameKey(data.gameKey))
        .catch((error) => console.error('Error fetching game key:', error))
    }
  }, [quizData])

  return (
    <div>
      {quizData && (
        <MultipleChoiseQuestion
          id={quizData.questions[0].id}
          text={quizData.questions[0].text}
          media={quizData.questions[0].media.content}
          answers={quizData.questions[0].answers}
        />
      )}
    </div>
  )
}

export default StartQuiz
