import React, { useState } from "react";
import "./LoginScreen.css";
import iplLogo from "./../../assets/iplLogo.ico";
import ballLoader from "./../../assets/ballLoader.webp";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getapiLoginDatadetails,getapiSigndetails } from "../../redux/globalActions";

const LoginScreen = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle Input Change
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setErrors({}); // Clear errors when user types
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setErrors({}); 
    setCredentials({ username: "", password: "", confirmPassword: "" }); 
  };

  // Handle Form Submission
  const handleSubmit = async () => {
    setErrors({});

    if (!credentials.username || !credentials.password || (isSignUp && !credentials.confirmPassword)) {
      setErrors({
        username: credentials.username ? "" : "Please enter a username",
        password: credentials.password ? "" : "Please enter a password",
        confirmPassword: isSignUp && !credentials.confirmPassword ? "Please confirm your password" : "",
      });
      return;
    }

    if (isSignUp && credentials.password !== credentials.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match." });
      return;
    }

    try {
      setLoading(true);
      let payload;
      if(isSignUp){
        payload = { 
          "email": credentials.username ,
          "employeeRoleMasterId": null,
          "gender": null,
          "name": null,
          "password": credentials.password,
          "phoneNo": null
        

        };
        const response = await dispatch(getapiSigndetails(payload, "post"));

      if (response) {
        setIsSignUp(!isSignUp);

       
      }

      }
      else{
         payload = { password: credentials.password, userName: credentials.username };
   
         const response = await dispatch(getapiLoginDatadetails(payload, "post"));

      if (response) {
        localStorage.setItem("token", response.data);
        navigate("/home");
      }

    }
    } catch (error) {
      setErrors({ login: error });
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
        <h2 className="title">{isSignUp ? "New User Sign Up" : "CRCI Fantasy Login"}</h2>

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

        <div className="input-group password-group">
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

        {isSignUp && (
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Enter Confirm Password"
              value={credentials.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "input-error" : ""}
            />
            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
          </div>
        )}

        {errors.login && <p className="error-text login-error">{errors.login}</p>}
        <div style={{marginTop:'20px'}}>

        <button onClick={handleSubmit} style={{marginBottom:"15px"}} className="login-btn" disabled={loading}>
          {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
        </button>

        <button className="toggle-btn" onClick={toggleMode}>
          {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
