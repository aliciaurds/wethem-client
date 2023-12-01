import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate } from "react-router-dom"

function IsPrivate(props) {

  const {isLoggedIn} = useContext(AuthContext)

  if(isLoggedIn) {
    return props.children

  }else{
    //here we cant use navigate() but Navigate
    return <Navigate to={"/login"} />
  }

}

export default IsPrivate