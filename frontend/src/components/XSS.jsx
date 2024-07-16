import React from 'react';
import { useLocation } from 'react-router-dom';

const XSS = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('name');

  return (
    <div className="container">
      <h1>Reflected XSS Demo</h1>
      <div>
        <p>Hello, {query}</p>
      </div>
    </div>
  );
};

export default XSS;
