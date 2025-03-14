import React, { useState } from "react";
import "./LoginScreen.css";
import iplLogo from "./../../assets/iplLogo.ico"; 
import ballLoader from "./../../assets/ballLoader.webp"; 
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getapiLoginDatadetails } from "../../redux/globalActions";
import { API_BASE_URL, mockMode } from "../../api/apiConfig";


const LoginScreen = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" ,confirmpassword:""});
  const [errors, setErrors] = useState({ username: "", password: "", confirmpassword:"",login: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); 
  };

  const handleLogin = async () => {

    setErrors({ username: "", password: "", login: "" });

    if (!credentials.username || !credentials.password ||  !credentials.confirmpassword) {
      setErrors({
        username: credentials.username ? "" : "Please enter a username",
        password: credentials.password ? "" : "Please enter a password",
        confirmpassword: credentials.confirmpassword ? "" : "Please enter a confirm password",

      });
      return;
    }

    if (credentials.password !== credentials.confirmpassword) {
      setErrors({ ...errors, confirmpassword: "Your password and confirm password must be the same." });
      return;
    }
    
    try {
      setLoading(true);

     let Payload=
      {
        "password": credentials.password,
        "userName": credentials.username
      }
      
     const response= await dispatch(getapiLoginDatadetails(Payload,"post"));

      console.log(response,
        "skdskl"
      )

      if (response) {
        localStorage.setItem("token", response.data); 

        navigate("/dashboard"); 
      } 
    } catch (error) {
      console.error("LoginError:", error);
      const errorMessage = error || "Login failed1. Please try again.";
      setErrors({ ...errors, login: errorMessage });
    }
         setLoading(false);
 

  };

  return (
    <div className="login-container">
       {loading && (
        <div className="loading-overlay">
          <img src={ballLoader} alt="Loading..." className="ball-loader" />
        </div>
      )}
      <div className="login-box">
        <img src={iplLogo} alt="IPL Logo" className="ipl-logo" />
        <h2 className="title">CRCI Fantasy </h2>

        <div className="input-group">
          <label htmlFor="username">Username/Email</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Enter Username/Mail"
            value={credentials.username}
            onChange={handleChange}
            className={errors.username ? "input-error" : ""}
          />
          {errors.username && <p className="error-text">{errors.username}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={credentials.password}
            onChange={handleChange}
            className={errors.password ? "input-error" : ""}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            id="confirmpassword"
            type="password"
            name="confirmpassword"
            placeholder="Enter confirm password"
            value={credentials.confirmpassword}
            onChange={handleChange}
            className={errors.confirmpassword ? "input-error" : ""}
          />
          {errors.confirmpassword && <p className="error-text">{errors.confirmpassword}</p>}
        </div>
        <br/>

        {errors.login && <p className="error-text login-error">{errors.login}</p>}

        <button onClick={handleLogin} className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
