import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const navStyles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
 
  }
  return (
    <div style={navStyles}>
      <NavLink to="/">Home</NavLink> 
      <NavLink to="/signup">Registro</NavLink>
      <NavLink to="/login">Acceso</NavLink>
    </div>
  );
}

export default Navbar;
