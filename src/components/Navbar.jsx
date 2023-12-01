import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import UserLogo from "../assets/images/User-Profile-PNG-Free-Download.png"
import Logo from "../assets/images/wethem.png"

function Navbar() {
  const navStyles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",    
   
  }
  const btnStyles = {
  color: "red", 
  borderRadius: "25px",
  borderColor: "red", 
  background: "transparent",
  cursor: "pointer",
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
        
        <NavLink style={{color:"red",textDecoration: "none"}} to="/"><img src={Logo} alt="logo" width={80} /></NavLink> 
        <NavLink  style={{color:"red",textDecoration: "none"}} to="/category">Categories</NavLink> 
        <NavLink  style={{color:"red",textDecoration: "none"}} to="/account"><img src={UserLogo} alt="userlogo" width={18} /></NavLink>
        <NavLink  style={{color:"red",textDecoration: "none"}} to="/wishlist">❤️</NavLink>
        <NavLink  style={{color:"red",textDecoration: "none"}} to="/shoppingCart">🛒</NavLink>
        <button onClick={handleLogOut} style={btnStyles}>Log Out</button>
      </nav>
    );
  }
  else{
    return (
      <nav style={navStyles}>
        <NavLink  style={{color:"red",textDecoration: "none"}} to="/">Home</NavLink> 
        <NavLink  style={{color:"red",textDecoration: "none"}} to="/category">Categories</NavLink> 
        <NavLink  style={{color:"red",textDecoration: "none"}} to="/signup">Sign Up</NavLink>
        <NavLink  style={{color:"red",textDecoration: "none"}} to="/login">Log In</NavLink>
        <NavLink  style={{color:"red",textDecoration: "none"}} to="/wishlist">❤️</NavLink>
        <NavLink  style={{color:"red",textDecoration: "none"}} to="/shoppingCart">🛒</NavLink>
      </nav>
    );
  }
 
}

export default Navbar;
