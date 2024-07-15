// OutputEncodingVulnerable.jsx

import React, { useState } from 'react';

const OutputEncodingVulnerable = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleOutput = () => {
    // Simulate unsafe output encoding
    setOutputText(inputText); // No encoding done here (vulnerable)
  };

  return (
    <div>
      <h2>Output Encoding Vulnerable Example</h2>
      <div>
        <label htmlFor="inputText">Input Text:</label>
        <input
          type="text"
          id="inputText"
          value={inputText}
          onChange={handleInputChange}
        />
        <button onClick={handleOutput}>Output</button>
      </div>
      <div>
        <h3>Output:</h3>
        <p dangerouslySetInnerHTML={{ __html: outputText }}></p>
      </div>
    </div>
  );
};

export default OutputEncodingVulnerable;
