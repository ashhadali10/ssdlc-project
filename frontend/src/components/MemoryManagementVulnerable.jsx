import React, { useState, useEffect } from "react";
import axios from "axios";

const MemoryManagementVulnerable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulate fetching large data
    axios.get("/api/excessive-memory").then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Memory Management Vulnerability Example</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemoryManagementVulnerable;
