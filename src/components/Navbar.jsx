import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const navStyles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",    
  }
  const navigate = useNavigate()
  const {isLoggedIn, authenticateUser} = useContext(AuthContext)

  const handleLogOut = () =>{
    localStorage.removeItem("authToken");
    //invoke agagin authenticateUser because once I remove the tokens the states will be changed to false
    authenticateUser()

    navigate("/")
  }

  if(isLoggedIn) {
    return (
      <nav style={navStyles}>
        <NavLink to="/">Home</NavLink> 
        <NavLink to="/profile">Profile</NavLink>
        <button onClick={handleLogOut}>Log Out</button>
      </nav>
    );
  }
  else{
    return (
      <nav style={navStyles}>
        <NavLink to="/">Home</NavLink> 
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/login">Log In</NavLink>
      </nav>
    );
  }
 
}

export default Navbar;
