import React from 'react';
import { Card, Container, Form} from 'react-bootstrap';
import '../App.css'; // Import custom CSS

const TextSubmitionQuestion = ({ id, text, media, answers }) => {
    return (
        <Container>
            <Card className="shadow-sm rounded">
                <Card.Body>
                    <Card.Title className="question-title">{id}. {text}</Card.Title>
                    {media && <Card.Img variant="top" className="question-media" src={media} />}
                    {/* You can add answers rendering here if needed */}
                </Card.Body>
                <Form>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="answer" placeholder="submit ypour answer" />
                </Form>
            </Card>
        </Container>
    );
};

export default TextSubmitionQuestion;
