import React, { useState } from 'react';

const ReflectedXSS = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleTestXSS = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/xss-test?query=${encodeURIComponent(query)}`);
      const data = await res.text();
      setResponse(data);
    } catch (error) {
      console.error(error);
      setResponse('Error occurred while testing XSS.');
    }
  };

  return (
    <div className="container">
      <h1>Test Reflected XSS Vulnerability</h1>
      <form onSubmit={handleTestXSS}>
        <label htmlFor="query">Enter Query:</label>
        <input
          type="text"
          id="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">Test XSS</button>
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

export default ReflectedXSS
