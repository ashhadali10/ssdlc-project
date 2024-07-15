// WeakHashing.jsx

import React, { useState } from 'react';
import md5 from 'md5'; // Importing MD5 for demonstration

const WeakHashing = () => {
  const [password, setPassword] = useState('');
  const [hashedPassword, setHashedPassword] = useState('');

  const handleInputChange = (event) => {
    setPassword(event.target.value);
  };

  const handleHashPassword = () => {
    // Simulate using MD5 for hashing (vulnerable practice)
    const hash = md5(password); // Using MD5 for hashing (vulnerable)
    setHashedPassword(hash);
  };

  return (
    <div>
      <h2>Weak Hashing Example (MD5)</h2>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handleInputChange}
        />
        <button onClick={handleHashPassword}>Hash Password</button>
      </div>
      <div>
        <h3>Hashed Password:</h3>
        <p>{hashedPassword}</p>
      </div>
    </div>
  );
};

export default WeakHashing;
