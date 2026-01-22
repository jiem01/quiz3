// src/pages/NoPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NoPage = () => {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default NoPage;
