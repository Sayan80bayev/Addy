import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthenticateUserMutation } from "../../store/api/authenticationApi";
import axios from "axios";
import { useDispatch } from "react-redux";
import "../style/App.css";

export default function Login() {
  var currentUrl = window.location.href;
  var url = new URL(currentUrl);

  const [formData, setFormData] = useState(new FormData());
  const [authenticateUser] = useAuthenticateUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState(location.state || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setMessage({
        status: "error",
        message: "Email and password are required",
      });
      return;
    }
    try {
      const response = await authenticateUser(formData).unwrap();
      if (response.token) {
        console.log(response.token);
        localStorage.setItem("authToken", response.token);
        return navigate("/index");
      } else {
        setMessage({
          status: "error",
          message: "Wrong credentials",
        });
      }
    } catch (error) {
      setMessage({
        status: "error",
        message: "Authentication failed",
      });
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="wrapper">
        <div className="title">Login Form</div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              name="email"
              type="text"
              value={formData.email}
              onChange={handleInputChange}
            />
            <label>Email Address</label>
          </div>
          <div className="field">
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <label>Password</label>
          </div>
          <div className="content">
            <div className="checkbox">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <div className="pass-link">
              <a href="#">Forgot password?</a>
            </div>
          </div>
          <div className="field">
            <input type="submit" value="Login" />
          </div>
          <div className="signup-link">
            Not a member? <Link to="/registration">Signup now</Link>
          </div>
          <br />
          {message?.status && (
            <p className="alert alert-danger">{message.message}</p>
          )}
          {url?.searchParams.has("out") && (
            <p className="alert alert-success">Successfully logged out!</p>
          )}
        </form>
      </div>
    </>
  );
}
