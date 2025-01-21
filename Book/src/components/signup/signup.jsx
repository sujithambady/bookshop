import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './signup.css'

function SignUp() {
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const changeEmail = (event) => {
        setEmail(event.target.value);
    };

    const changeUser = (event) => {
        setUserType(event.target.value);
    };

    const changePassword = (event) => {
        setPassword(event.target.value);
    };

    const submitDetails = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://localhost:7239/api/User/register', {
                usertype: userType,
                email: email,
                password: password
            });
            console.log('Response:', response.data.userId);
            if (response.data.userId != null) {
                if (window.confirm('Registered Successfully. Click "OK" to login now.')) {
                    navigate('/login')
                    setEmail('');
                    setPassword('');
                    setUserType('Select User Type');
                }
                else {
                    window.confirm('Not Registered..!!')
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            window.confirm('Not Registered..!!')
        }
    };
    return (
        <>
            <div className="main">

                <section className="signup">
                    <img src="images/signup-bg.jpg" alt="" />
                    <div className="container">
                        <div className="signup-content">
                            <form className="signup-form" onSubmit={submitDetails}>
                                <h2 style={{ fontFamily: 'Poppins', marginBottom: 15 }} className="form-title">Universal Book Store</h2>
                                <h2 style={{ fontFamily: 'Poppins', marginTop: 0, textAlign: 'center', fontWeight: 700 }} className="form-title">SignUp</h2>
                                <div className="form-group">
                                    <select className="slctClss" name="userType" id="userType" value={userType} onChange={changeUser} required>
                                        <option className="slctClss" value="">Select User Type</option>
                                        {/* <option className="slctClss" value="SHOP">Shop Owner</option> */}
                                        <option className="slctClss" value="USER">User</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-input" name="email" id="email" value={email}
                                        onChange={changeEmail} placeholder="Your Email" />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-input" name="password" id="password" value={password}
                                        onChange={changePassword} placeholder="Password" />
                                    <span toggle="#password" className="zmdi zmdi-eye field-icon toggle-password"></span>
                                </div>
                                <div className="form-group">
                                    <input style={{ cursor: 'pointer' }} type="submit" name="submit" id="submit" className="form-submit" value="Sign up" />
                                </div>
                            </form>
                            <p className="loginhere">
                                Have already an account ? <a href="/login" className="loginhere-link">Login here</a>
                            </p>
                        </div>
                    </div>
                </section>

            </div>
        </>
    )
}

export default SignUp