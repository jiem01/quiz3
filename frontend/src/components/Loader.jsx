// src/components/Loader.jsx
import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
