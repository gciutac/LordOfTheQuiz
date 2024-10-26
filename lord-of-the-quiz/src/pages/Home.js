import React, { useContext, useState, useEffect } from 'react'
import { Card, Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import '../App.css'

const Home = () => {
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate()
  
  const handleStartQuizButtonClick = () => {
    updateUser({ username: user.username, userType: "master" });
    navigate(`/join`)
  }

  const handleJoinQuizButtonClick = () => {
    updateUser({ username: user.username, userType: "player" });
    navigate(`/join`)
  }

  return (
    <Container className="d-flex vh-100 align-items-center justify-content-center">
      <Card style={{ width: '18rem' }} className="shadow-sm rounded">
        <Card.Body>
          <Card.Img
            variant="top"
            src="/favicon.ico"
            style={{ width: '5rem' }}
          />
          <Card.Title className="text-center">Lord of the Quiz</Card.Title>
          <Card.Text className="text-center">One quiz to rule them all</Card.Text>
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
    </Container>
  )
}

export default Home
