import React, { useState, useEffect } from 'react'
import MultipleChoiseQuestion from './MultipleChoiseQuestion'

const Home = () => {
  const [name, setName] = useState('')
  const [quizData, setQuizData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/quiz')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setQuizData(data)
      } catch (error) {
        console.error('Fetch error:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      {quizData && (
          <MultipleChoiseQuestion id={quizData.questions[0].id} text={quizData.questions[0].text} media={quizData.questions[0].media.content} answers={quizData.questions[0].answers}/>
      )}
    </div>
  )
}

export default Home
