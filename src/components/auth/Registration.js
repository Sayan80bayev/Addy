import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Registration() {
  const [user, setUser] = useState({ email: "", username: "", password: "" });
  const [message, setMessage] = useState({ status: "", message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.email || !user.username || !user.password) {
      setMessage({
        status: "error",
        message: "Please fill out all fields.",
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      setMessage({
        status: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(user.password)) {
      setMessage({
        status: "error",
        message:
          "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/auth/register",
        user
      );
      setMessage({
        status: "success",
        message: "Registered successfully!",
      });
    } catch (error) {
      setMessage({
        status: "error",
        message: error.response
          ? error.response.data
          : "Registration failed. Please try again later.",
      });
    }
  };

  return (
    <div className="wrapper">
      <div className="title">Registration Form</div>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input type="text" name="email" onChange={handleInputChange} />
          <label>Email Address</label>
        </div>
        <div className="field">
          <input type="text" name="username" onChange={handleInputChange} />
          <label>Name</label>
        </div>
        <div className="field">
          <input type="password" name="password" onChange={handleInputChange} />
          <label>Password</label>
        </div>
        <div className="content">
          <div className="checkbox">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
        </div>
        <div className="field">
          <input type="submit" value="Register" />
        </div>
        <div className="signup-link">
          Already registered? <Link to="/login">Log in now</Link>
        </div>
        <br />
        {message?.status === "error" && (
          <p className="alert alert-danger">{message.message}</p>
        )}
        {message?.status === "success" && (
          <p className="alert alert-info">{message.message}</p>
        )}
      </form>
    </div>
  );
}
