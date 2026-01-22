import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import UserCard from '../components/UserCard';
import { useNavigate } from 'react-router-dom';

const UserListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList || {};

  // Debug logs
  console.log('userLogin state:', userLogin);
  console.log('userList state:', userList);
  console.log('users array:', users);

  useEffect(() => {
    // If not logged in, redirect to login
    if (!userInfo) {
      console.log('No userInfo, redirecting to /login');
      navigate('/login');
    } 
    // If logged in but not superuser
    else if (!userInfo.is_superuser) {
      console.log('User is not superuser:', userInfo);
      alert('Access denied. Only superusers can view users.');
      navigate('/');
    } 
    else {
      console.log('Dispatching listUsers()');
      dispatch(listUsers());
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <div>
      <h2>All Users</h2>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {users && users.length > 0 ? (
          users.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default UserListPage;
