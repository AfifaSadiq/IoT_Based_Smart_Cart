import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavEnter from '../components/NavEnter';
import './Signup.css';

const Signup = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const BE_URL = import.meta.env.VITE_BE_URL;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${BE_URL}/register`, { name, email, password })
            .then(result => {
                console.log(result);
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <NavEnter />
            <div className="SignupBox">
                <div className="form-container">
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                placeholder="Enter Name"
                                autoComplete="off"
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
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
                            Register
                        </button>
                    </form>
                    <p>Already Have an Account?</p>
                    <Link to="/login" className="redirect-button">
                        Login
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Signup;
