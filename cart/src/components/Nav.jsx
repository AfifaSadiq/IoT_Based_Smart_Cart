import React, {useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { handleLogout } from "../Utils/LogOut";
import "./Nav.css";

const Nav = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(()=> {
    if(location.pathname === "/home"){
      setActiveTab("Home");
    } else if(location.pathname === "/cartdeets") {
      setActiveTab("CartDeets");
    }else if(location.pathname === "/pay") {
      setActiveTab("Pay");
    }
  }, [location]);

  

  return (
    <div className="header">
        <div className="header__left">
            <img className="logo" src="/src/assets/icon.png" alt="cartgo icon" />
            <h2>CartGO</h2>
        </div>
        <div className="header__center">
            <Link to="/home">
                <p className={`${activeTab === "Home" ? "active" : ""}`} onClick={() => setActiveTab("Home")}>
                    Home
                </p>
            </Link>
            <Link to="/cartdeets">
                <p className={`${activeTab === "CartDeets" ? "active" : ""}`} onClick={() => setActiveTab("CartDeets")}>
                    CartDeets
                </p>
            </Link>
            <Link to="/pay">
                <p className={`${activeTab === "Pay" ? "active" : ""}`} onClick={() => setActiveTab("Pay")}>
                    Pay
                </p>
            </Link>
        </div>
        <div className="header__right">
            <img src="/src/assets/profile-user.png" alt="user" />
            <Link to="/login">
            <p className={`${activeTab === "Login" ? "active" : ""}`} onClick={() => handleLogout(navigate)}>
                    LogOut
                </p>
            </Link>
        </div>
    </div>
);
}

export default Nav