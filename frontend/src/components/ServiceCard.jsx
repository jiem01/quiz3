// src/components/ServiceCard.jsx
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating'; // optional if you want to show stars

const ServiceCard = ({ service }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/service/${service.id}`}>
                <Card.Img
  src={
    service.id === 1
                            ? 'http://127.0.0.1:8000/media/services/pool.jpg'
                            : service.id === 2
                            ? 'http://127.0.0.1:8000/media/services/footspa.jpg'
                            : service.id === 8
                            ? 'http://127.0.0.1:8000/media/services/massage.jpg'
                            : 'https://via.placeholder.com/200x150'
  }
  variant="top"
/>

            </Link>
            <Card.Body>
                <Link to={`/service/${service.id}`}>
                    <Card.Title as="div">
                        <strong>{service.service_name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    {service.rating && <Rating value={service.rating} text={`${service.rating} stars`} />}
                </Card.Text>
                <Card.Text as="p">{service.description}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ServiceCard;
