import logo from './logo.svg'
import React from 'react'
import Home from './pages/Home'
import StartQuiz from './pages/StartQuiz'
import JoinQuiz from './pages/JoinQuiz'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { UserProvider } from "./context/UserContext"
import { GamerProvider } from './context/GameContext'

function App() {
  return (
    <UserProvider>
      <GamerProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/join/" element={<JoinQuiz />} />
            <Route path="/game/:gameid" element={<StartQuiz />} />
          </Routes>
        </Router>
      </GamerProvider>
    </UserProvider>
  )
}

export default App
