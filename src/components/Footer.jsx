import { Link, NavLink } from "react-router-dom";
import gitLogo from "../assets/images/GitHub_logo.png"
import linkedinLogo from "../assets/images/logo-linkedin-icon-4096.png"


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
       <NavLink to="/about">About Us | </NavLink> 
       <span>Done by Alicia Urdiales
        <Link to={"https://github.com/aliciaurds"}> <img src={gitLogo} alt="githubLogo" width={20}/></Link>
        <Link to={"https://www.linkedin.com/in/alicia-urdiales-101785143/"}> <img src={linkedinLogo} alt="linkedinlogo" width={20}/>
         </Link>
        </span> 
       </div>
    </div>
  )
}

export default Footer