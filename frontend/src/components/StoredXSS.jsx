// StoredXSS.jsx

import React, { useState } from 'react';

const StoredXSS = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');

  const handleStoreData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/storedxss`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });
      const data = await res.json();
      setResponse(data.message);
    } catch (error) {
      console.error(error);
      setResponse('Error occurred while storing data.');
    }
  };

  return (
    <div className="container">
      <h1>Store Data (Vulnerable to Stored XSS)</h1>
      <form onSubmit={handleStoreData}>
        <label htmlFor="userInput">Enter Data:</label>
        <input
          type="text"
          id="userInput"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          required
        />
        <button type="submit">Store Data</button>
      </form>
      {response && (
        <div className="response">
          <h2>Response:</h2>
          <p dangerouslySetInnerHTML={{ __html: response }}></p>
        </div>
      )}
    </div>
  );
};

export default StoredXSS;
