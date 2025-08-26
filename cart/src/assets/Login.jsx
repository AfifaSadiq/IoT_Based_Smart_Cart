import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import NavEnter from '../components/NavEnter';

const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const BE_URL = import.meta.env.VITE_BE_URL;

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${BE_URL}/login`, {email, password})
        .then(result => {
            console.log(result)
            
            if(result.data === "Success"){
                navigate('/home')
            } else if (result.data === "No record exists") {
                alert("Record does not exist. Please try again.");
            } else if (result.data === "incorrect password") {
                alert("Incorrect password. Please try again.");
            }
        })
        .catch(err => {
            console.error("An error occurred:", err);
            alert("An error occurred. Please try again.");
        });
    }

    return (
        <>
            <NavEnter />
            <div className="SignupBox">
                <div className="form-container">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                placeholder="Enter Email"
                                autoComplete="off"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                autoComplete="off"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="submit-button">
                            Login
                        </button>
                        <p>Don't have an Account</p>
                        <Link to="/register" className="redirect-button">
                            Go Back To Register
                        </Link>    
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
