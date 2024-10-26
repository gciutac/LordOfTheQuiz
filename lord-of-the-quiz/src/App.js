import logo from './logo.svg'
import React from 'react'
import Home from './pages/Home'
import StartQuiz from './pages/StartQuiz'
import JoinQuiz from './pages/JoinQuiz'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/game/:gameid" element={<StartQuiz />} />
        <Route path="/join/:gameid" element={<JoinQuiz />} />
      </Routes>
    </Router>
  )
}

export default App
