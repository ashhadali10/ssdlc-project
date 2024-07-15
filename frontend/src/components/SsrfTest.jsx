// src/components/SSRFTest.jsx

import React, { useState } from 'react';

const SSRFTest = () => {
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleTestSSRF = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/ssrf-test?url=${encodeURIComponent(url)}`);
      const responseData = await response.text();
      setResponse(responseData);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Error occurred while testing SSRF.');
      setResponse('');
    }
  };

  return (
    <div className="container">
      <h1>Test SSRF Vulnerability</h1>
      <form onSubmit={handleTestSSRF}>
        <label htmlFor="url">Enter URL to fetch:</label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">Test SSRF</button>
      </form>
      {response && (
        <div className="response">
          <h2>Response:</h2>
          <pre>{response}</pre>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default SSRFTest;
