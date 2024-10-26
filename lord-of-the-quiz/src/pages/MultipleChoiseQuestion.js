import React from 'react';
import { Card, Container, Row, Col, ListGroup } from 'react-bootstrap';
import '../App.css'; // Import custom CSS

const MultipleChoiseQuestion = ({ id, text, media, answers }) => {
    return (
        <Container>
            <Card className="shadow-sm rounded">
                <Card.Body>
                    <Card.Title className="question-title">{id}. {text}</Card.Title>
                    {media && <Card.Img variant="top" className="question-media" src={media} />}
                    {/* You can add answers rendering here if needed */}
                </Card.Body>
                <ListGroup className="list-group-flush">
                    {answers.map((answer) => (
                        <ListGroup.Item key={answer.id}>{answer.id}. {answer.content}</ListGroup.Item>
                            ))}
                </ListGroup>
            </Card>
        </Container>
    );
};

export default MultipleChoiseQuestion;
