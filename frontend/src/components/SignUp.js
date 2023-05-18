import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/')
    }
  })

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  // API call to submit the data
  const handleSubmit = async (e) => {
    console.warn(name, email, password);
    //using 'fetch' instead of axios module
    let result = await fetch('http://localhost:5000/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    result = await result.json()
    if (result.message == 'Already Exists') {
      alert("User Already Exists ! Kindly Proceed to Login")
      navigate('/login')
    } else {
      localStorage.setItem("user", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate('/')
    }
  };
  // frontend block
  return (
    <div className="Register">
      <h1 className="text">Register Yourself !</h1>

      <input className="inputbox" type="text" value={name} onChange={handleNameChange} placeholder="Enter Name" />

      <input className="inputbox" type="text" value={email} onChange={handleEmailChange} placeholder="Enter Email" />

      <input className="inputbox" type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />

      <button className="formButton" type="submit" onClick={handleSubmit}>Sign Up</button>
    </div>
  );
};

export default SignUp;