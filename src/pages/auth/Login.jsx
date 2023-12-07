import {useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config";
import { AuthContext } from "../../context/auth.context";
import { Button, Form } from "react-bootstrap";
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
    <div className="details-container">

      <h1>Login</h1>

      <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address:</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        </Form.Group>

        <br />
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        </Form.Group>

        <br />

        <Button style={{marginTop : "10px"}} variant="outline-danger" type="submit">Log In</Button>
        <p style={{ color: "red" }}>{errMessage}</p>
      </Form>
      <p>Not registered yet?</p>
      <Button variant="outline-danger" onClick={toSignUp}>Sign Up</Button>
    </div>
  );
}

export default Login;
