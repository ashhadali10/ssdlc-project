// components/BlindXSS.jsx

import React, { useState } from 'react';

const BlindXSS = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleTestBlindXSS = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/blindxss?query=${encodeURIComponent(query)}`);
      const data = await res.text();
      setResponse(data);
    } catch (error) {
      console.error(error);
      setResponse('Error occurred while testing Blind XSS.');
    }
  };

  return (
    <div className="container">
      <h1>Test Blind XSS Vulnerability</h1>
      <form onSubmit={handleTestBlindXSS}>
        <label htmlFor="query">Enter Query:</label>
        <input
          type="text"
          id="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">Test Blind XSS</button>
      </form>
      {response && (
        <div className="response">
          <h2>Response:</h2>
          <div dangerouslySetInnerHTML={{ __html: response }}></div>
        </div>
      )}
    </div>
  );
};

export default BlindXSS;
