// src/components/UserCard.jsx
import React from 'react';
import { Card } from 'react-bootstrap';

const UserCard = ({ user }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Body>
        <Card.Title>
          {user.first_name} {user.last_name}
        </Card.Title>
        <Card.Text>{user.email}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
