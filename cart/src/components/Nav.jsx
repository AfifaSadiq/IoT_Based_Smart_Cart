import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { handleLogout } from "../Utils/LogOut";
import { Menu, X, Home, ShoppingCart, CreditCard, LogOut } from "lucide-react";
import "./Nav.css";
import icon from '../assets/icon.png';
import user from '../assets/profile-user.png';

const Nav = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/home") {
      setActiveTab("Home");
    } else if (location.pathname === "/cartdeets") {
      setActiveTab("CartDeets");
    } else if (location.pathname === "/pay") {
      setActiveTab("Pay");
    }
    // Close menu on route change (mobile)
    setMenuOpen(false);
  }, [location]);

  return (
    <div className="header">
      <div className="header__left">
        <img className="logo" src={icon} alt="cartgo icon" />
        <h2>CartGO</h2>
      </div>
      {/* Hamburger for mobile */}
      <div className="header__hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={32} /> : <Menu size={32} />}
      </div>
      <div className={`header__center ${menuOpen ? "show" : ""}`}>
        <Link to="/home" onClick={() => setActiveTab("Home")}>
          <p className={`${activeTab === "Home" ? "active" : ""}`}>
            <Home size={20} style={{ marginRight: 8, verticalAlign: "middle" }} />
            Home
          </p>
        </Link>
        <Link to="/cartdeets" onClick={() => setActiveTab("CartDeets")}>
          <p className={`${activeTab === "CartDeets" ? "active" : ""}`}>
            <ShoppingCart size={20} style={{ marginRight: 8, verticalAlign: "middle" }} />
            Cart Details
          </p>
        </Link>
        <Link to="/pay" onClick={() => setActiveTab("Pay")}>
          <p className={`${activeTab === "Pay" ? "active" : ""}`}>
            <CreditCard size={20} style={{ marginRight: 8, verticalAlign: "middle" }} />
            Pay
          </p>
        </Link>
        <Link to="/login" onClick={() => handleLogout(navigate)}>
          <p>
            <LogOut size={20} style={{ marginRight: 8, verticalAlign: "middle" }} />
            LogOut
          </p>
        </Link>
      </div>
      <div className="header__right">
        <img src={user} alt="user" />
      </div>
    </div>
  );
};

export default Nav;