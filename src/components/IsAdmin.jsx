import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsAdmin(props) {
  const { isLoggedIn, activeUser } = useContext(AuthContext);

  // Check if user is logged in and admin
  if (isLoggedIn && activeUser && activeUser.role === 'admin') {
    return props.children;
  } else {
    // Redirect to a different route if the user is not an admin
    return <Navigate to={"/access-denied"} />;
  }
}

export default IsAdmin;