import logo from './logo.svg'
import React from 'react'
import Home from './pages/Home'
import StartGame from './pages/StartGame'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/game/:gameid" element={<StartGame />} />
      </Routes>
    </Router>
  )
}

export default App
