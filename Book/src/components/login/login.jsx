import React, { useState } from "react";
import './login.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!userType) {
      newErrors.userType = "Please select a user type.";
    }
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@(gmail\.com|yahoo\.com)$/.test(email)) {
      newErrors.email = "Email must be a valid address.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      const response = await axios.post('https://localhost:7239/api/User/login', {
        usertype: userType,
        email: email,
        password: password
      });
      console.log('Response:', response.data.userId);
      if (response.data.userId != null) {
        if (userType === 'SHOP') {
          navigate('/home');
          localStorage.setItem('userId', response.data.userId);
          window.confirm('Login Successfully..!!');
        } else {
          navigate('/userHome');
          localStorage.setItem('userId', response.data.userId);
          window.confirm('Login Successfully..!!');
        }
        setEmail('');
        setPassword('');
        setUserType('');
      } else {
        window.confirm('Login Denied..!!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      window.confirm('Login Denied..!!');
    }
  };

  const changeUser = (event) => {
    setUserType(event.target.value);
  };

  return (
    <>
      <div className="main">
        <section className="signup">
          <img src="images/signup-bg.jpg" alt="" />
          <div className="container">
            <div className="signup-content">
              <form className="signup-form" onSubmit={handleSubmit}>
                <h2 style={{ fontFamily: 'Poppins', marginBottom: 15 }} className="form-title">Universal Book Store</h2>
                <h2 style={{ fontFamily: 'Poppins', marginTop: 0, textAlign: 'center', fontWeight: 700 }} className="form-title">Login</h2>
                <div className="form-group">
                  <select className="slctClss" name="userType" id="userType" value={userType} onChange={changeUser} required>
                    <option className="slctClss" value="">Select User Type</option>
                    <option className="slctClss" value="SHOP">Shop Owner</option>
                    <option className="slctClss" value="USER">User</option>
                  </select>
                  {errors.userType && <span className="error">{errors.userType}</span>}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-input"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-input"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <div className="form-group">
                  <input style={{ cursor: 'pointer' }} type="submit" name="login" id="submit" className="form-submit" value="Login" />
                </div>
              </form>
              <p className="loginhere">
                Don't have any account? <a href="/" className="loginhere-link">Sign Up here</a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;
