import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Create() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct the URL with query parameters
    const query = new URLSearchParams(formData).toString();
    navigate(`/?${query}`);
  };

  return (
    <div className="container">
      <h1>Create Post</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Create;
