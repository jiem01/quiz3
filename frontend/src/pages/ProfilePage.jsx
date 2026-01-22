import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState({});

  // Get user info from Redux (should contain JWT token)
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userInfo) return;
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.access}`, // or userInfo.token if that’s how you saved it
          },
        };
        const { data } = await axios.get(
          'http://127.0.0.1:8000/api/users/profile/',
          config
        );
        setProfile(data);
        setLoading(false);
      } catch (err) {
        setError(
          err.response && err.response.data.detail
            ? err.response.data.detail
            : err.message
        );
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userInfo]);

  if (!userInfo) return <Message variant="danger">Please log in to view profile</Message>;
  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <Row className="justify-content-md-center">
      <Col md={6}>
        <Card className="p-3 shadow-sm">
          <Card.Body>
            <Card.Title>Your Profile</Card.Title>
            <Card.Text><strong>Username:</strong> {profile.username}</Card.Text>
            <Card.Text><strong>Email:</strong> {profile.email}</Card.Text>
            <Card.Text><strong>First Name:</strong> {profile.first_name || 'N/A'}</Card.Text>
            <Card.Text><strong>Last Name:</strong> {profile.last_name || 'N/A'}</Card.Text>
            <Card.Text><strong>Is Admin:</strong> {profile.is_superuser ? 'Yes' : 'No'}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfilePage;
