import React from "react";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../Utils/LogOut";

const Paydone = () => {
  const navigate = useNavigate(); // Use the useNavigate hook to define navigate

  return (
    <>
      <p>Payment done successfully</p>
      <button onClick={() => handleLogout(navigate)}>LogOut</button>
    </>
  );
};

export default Paydone;
