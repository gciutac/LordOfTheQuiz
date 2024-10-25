import React, { useState, useEffect } from 'react'

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
    <section className="home">
      <h1>Welcome to the Lord of the Quiz!</h1>
      <h2>What is your name?</h2>
      <form>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
      {quizData && (
        <div>
          <h3>Quiz Data:</h3>
          <pre>{JSON.stringify(quizData, null, 2)}</pre>
        </div>
      )}
    </section>
  )
}

export default Home
