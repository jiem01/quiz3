import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listServices } from '../actions/serviceActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Container, Row, Col } from 'react-bootstrap';
import ServiceCard from '../components/ServiceCard';

const HomePage = () => {
  const dispatch = useDispatch();

  const serviceList = useSelector((state) => state.serviceList);
  const { loading, error, services } = serviceList;

  useEffect(() => {
    dispatch(listServices());
  }, [dispatch]);

  return (
    <Container className="my-5">
      <h1 className="mb-4 text-center">Our Services</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {services.map((service) => (
            <Col key={service.id} sm={12} md={6} lg={4}>
              <ServiceCard service={service} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default HomePage;
