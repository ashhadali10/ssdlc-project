import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [fname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  const [error, setError] = useState();
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  //receving single user data
  const getSingleData = async () => {
    const response = await fetch(`http://localhost:8000/${id}`);
    const result = await response.json();

    if (response.ok) {
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
  };

  //passing edited data to backend
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = { fname, email, age };
    console.log(updatedUser);
    const response = await fetch(`http://localhost:8000/edit/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
    const result = await response.json();
    if (response.ok) {
      console.log("updated result..", result);
      setError("");
      navigate("/read");
    }
    if (!response.ok) {
      console.log(response.error);
      setError(response.error);
    }
  };

  useEffect(() => {
    getSingleData();
  }, []);

  return (
    <div className="container my-2">
      {error && <div class="alert alert-danger"> {error} </div>}
      <h2 className="my-2">Update User</h2>
      <form className="form" onSubmit={handleUpdate}>
        <label htmlFor="fname">Name</label>
        <input
          type="text"
          id="fname"
          name="fname"
          value={fname}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Update;
