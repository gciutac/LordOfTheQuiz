import React, { useState, useEffect } from 'react'
import MultipleChoiseQuestion from './components/MultipleChoiseQuestion'
import { Card } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

const StartGame = () => {
  const location = useLocation()
  const { quizData } = location.state || {}
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

export default StartGame
