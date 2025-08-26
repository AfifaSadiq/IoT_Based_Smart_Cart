import React, {useState, useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";
import "./Nav.css";

const NavEnter = () => {
  const [activeTab, setActiveTab] = useState("Home");


  return (
    <div className="header">
        <div className="header__left">
            <img className="logo" src="/src/assets/icon.png" alt="cartgo icon" />
            <h2>CartGO</h2>
        </div>
        
        <div className="header__right">
            <img src="/src/assets/profile-user.png" alt="user" />
            <Link to="/login">
                <p className={`${activeTab === "Login" ? "active" : ""}`} onClick={() => setActiveTab("Login")}>
                    LogIn
                </p>
            </Link>
        </div>
    </div>
);
}

export default NavEnter