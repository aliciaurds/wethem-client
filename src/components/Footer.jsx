import { NavLink } from "react-router-dom";

function Footer() {
  const footerStyles = {
    position: "fixed",
    bottom: 0,
    textAlign: "center",
    padding: "10px 0",
    backgroundColor: "lightgrey",
    width: "100%",

  }
  const containerStyles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",  

  }
  return (
    <div style={containerStyles}>
        <div style={footerStyles}>
       <NavLink style={{color:"red", textDecoration: "none"}} to="/about">About Us</NavLink> 
       </div>
    </div>
  )
}

export default Footer