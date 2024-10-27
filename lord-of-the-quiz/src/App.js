import logo from './logo.svg'
import React from 'react'
import Home from './pages/Home'
import StartQuiz from './pages/StartQuiz'
import JoinQuiz from './pages/JoinQuiz'
import GameOver from './pages/GameOver'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { UserProvider } from "./context/UserContext"
import { GamerProvider } from './context/GameContext'
import Lobby from './pages/lobby'

function App() {
  return (
    <UserProvider>
      <GamerProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/join" element={<JoinQuiz />} />
            <Route path="/game" element={<StartQuiz />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/gameover" element={<GameOver />} />
          </Routes>
        </Router>
      </GamerProvider>
    </UserProvider>
  )
}

export default App
