import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import NavEnter from '../components/NavEnter';


const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/login', {email, password})
        .then(result => {
            console.log(result)
            
            if(result.data === "Success"){
                navigate('/home')
            } else if (result.data === "No record exists") {
                // Show alert if no user is found
                alert("Record does not exist. Please try again.");
            } else if (result.data === "incorrect password") {
                // Show alert if password is incorrect
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
    <div className = "SignupBox">
        <div className= "bg-white p-3 rounded w-25">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                    Login
                </button>
                <p>Don't have an Account</p>
                <Link to="/" type="submit" className="redirect-button">
                    Go Back To Register
                </Link>    
            </form>
            
        </div>

    </div>
    </>
  )
}

export default Login