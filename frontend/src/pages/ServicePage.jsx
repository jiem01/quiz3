import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { getServiceDetails } from '../actions/serviceActions'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

function ServicePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const serviceDetails = useSelector((state) => state.serviceDetails)
  const { loading, error, service } = serviceDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      dispatch(getServiceDetails(id))
    }
  }, [dispatch, id, userInfo, navigate])

  const startServiceHandler = () => {
    navigate(`/service/${id}/start`)
  }

  // Determine which image to show based on the name
  const displayImage = service?.service_name?.toLowerCase().includes('massage')
    ? '/images/massage.jpg'
    : service?.sample_image;

  return (
    <>
      <Link to='/' className='btn btn-secondary my-3'>
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            {/* Using displayImage logic here */}
            <Image src={displayImage} alt={service.service_name} fluid />
          </Col>

          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                {/* Binding to service_name */}
                <h3>{service.service_name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                {service.description}
              </ListGroup.Item>

              {service.rating !== undefined && (
                <ListGroup.Item>
                  <Rating
                    value={service.rating}
                    text={`${service.numReviews || 0} reviews`}
                    color='#f8e825'
                  />
                </ListGroup.Item>
              )}

              {service.duration_of_service && (
                <ListGroup.Item>
                  Duration: {service.duration_of_service}
                </ListGroup.Item>
              )}

              {service.name_of_the_expert && (
                <ListGroup.Item>
                  Expert: {service.name_of_the_expert}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                {service.price && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${service.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    className='btn-block w-100'
                    type='button'
                    onClick={startServiceHandler}
                  >
                    Start Service
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ServicePage