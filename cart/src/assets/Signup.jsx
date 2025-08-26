import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavEnter from '../components/NavEnter';
import './Signup.css'

const Signup = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const BE_URL = import.meta.env.VITE_BE_URL;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${BE_URL}/register`, {name, email, password})
            .then(result => {
                console.log(result);
                navigate('/login');  // Navigate using only the path
            })
            .catch(err => console.log(err));
    };
    

  return (
    <>
    <NavEnter />
    <div className = "SignupBox">
        <div className= "bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Name</strong>
                        </label>
                        <input
                            type= "text"
                            placeholder= "Enter Name"
                            autoComplete= "off"
                            name= "email"
                            className="form-control rounded-0"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type= "text"
                            placeholder= "Enter Email"
                            autoComplete= "off"
                            name= "email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input
                            type= "text"
                            placeholder= "Enter Password"
                            autoComplete= "off"
                            name= "password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Register
                    </button>
                </form>
                <p>Already Have an Account</p>
                <Link to="/login" type="submit" className="redirect-button">
                    Login
                </Link>
            </div>
    </div>
    </>
  )
}

export default Signup