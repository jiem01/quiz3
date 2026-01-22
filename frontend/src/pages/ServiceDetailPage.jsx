import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getServiceDetails } from '../actions/servicesActions';

const ServiceDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const serviceDetail = useSelector((state) => state.serviceDetail);
    const { loading, error, service } = serviceDetail;

    useEffect(() => {
        dispatch(getServiceDetails(id));
    }, [dispatch, id]);

    if (loading) return <Loader />;
    if (error) return <Message variant="danger">{error}</Message>;

    return (
        <Row>
            <Col md={6}>
                <Image
  src={
    service.id === 1
      ? 'http://127.0.0.1:8000/media/services/pool.jpg'
      : service.id === 2
      ? 'http://127.0.0.1:8000/media/services/footspa.jpg'
      : 'https://via.placeholder.com/400'
  }
  fluid
/>

            </Col>
            <Col md={6}>
                <Card className="p-3 shadow-sm">
                    <Card.Body>
                        <Card.Title>{service.service_name}</Card.Title>
                        <Card.Text>{service.description}</Card.Text>
                        <Card.Text>Rating: {service.rating || 'N/A'}</Card.Text>
                        <Card.Text>Price: ${service.price || 'N/A'}</Card.Text>
                        <Card.Text>Duration: {service.duration_of_service || 'N/A'}</Card.Text>
                        <Card.Text>Expert: {service.name_of_the_expert || 'N/A'}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default ServiceDetailPage;
