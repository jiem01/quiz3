import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

function Service({ service }) {
  // Logic: If name contains "massage", use hardcoded file. Otherwise, use DB image.
  const imageSrc = service.service_name?.toLowerCase().includes('massage') 
    ? '/images/massage.jpg' 
    : service.sample_image;

  return (
    <Card className='my-3 p-3 rounded'>
      {/* Django uses 'id', not '_id' */}
      <Link to={`/service/${service.id}`}>
        <Card.Img src={imageSrc} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/service/${service.id}`}>
          <Card.Title as='div'>
            {/* Matches your Backend 'service_name' */}
            <strong>{service.service_name}</strong>
          </Card.Title>
        </Link>

        {service.description && (
          <Card.Text as='p'>
            {service.description.substring(0, 80)}...
          </Card.Text>
        )}

        {service.rating !== undefined && (
          <Card.Text as='div'>
            <Rating
              value={service.rating}
              text={`${service.numReviews || 0} reviews`}
              color='#f8e825'
            />
          </Card.Text>
        )}

        {service.price && (
          <Card.Text as='h3'>
            ${service.price}
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  )
}

export default Service