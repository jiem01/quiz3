// src/components/Rating.jsx
import React from 'react';

const Rating = ({ value, text, color = '#f8e825' }) => {
  return (
    <div className="rating">
      <span style={{ color }}>
        {'★'.repeat(Math.floor(value))}
      </span>
      <span style={{ color }}>
        {'☆'.repeat(5 - Math.floor(value))}
      </span>
      <span>{text && ` ${text}`}</span>
    </div>
  );
};

export default Rating;
