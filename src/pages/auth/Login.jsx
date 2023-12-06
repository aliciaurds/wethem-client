import {useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config";
import { AuthContext } from "../../context/auth.context";
function Login() {
  const {authenticateUser} = useContext(AuthContext)
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMessage, setErrMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const credentials = { email, password };
      const response = await service.post("/auth/login", credentials);
      //store safely the token in localStorage
      localStorage.setItem("authToken", response.data.authToken) 
      //before navigating
      await authenticateUser()
    
      navigate("/"); //!Testing => luego /all
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 400) {
        setErrMessage(err.response.data.errMessage);
      } else {
        navigate("/error");
      }
    }
    
  };
  const toSignUp = () => {
    navigate("/signup"); 
  };
  return (
    <div>
      <hr />
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Log In</button>
        <p style={{ color: "red" }}>{errMessage}</p>
      </form>
      <p>Not registered yet?</p>
      <button onClick={toSignUp}>Sign Up</button>
    </div>
  );
}

export default Login;
