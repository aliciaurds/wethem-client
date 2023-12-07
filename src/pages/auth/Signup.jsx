import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config";
import { RingLoader } from "react-spinners";
import { Button, Form } from "react-bootstrap";
function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState(0);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  //error msg handling
  const [errMessage, setErrMessage] = useState("");
  
  const [isUploading, setIsUploading] = useState(false);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleStreetChange = (e) => setStreet(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handleCountryChange = (e) => setCountry(e.target.value);
  const handlePostalCodeChange = (e) => setPostalCode(e.target.value);
  const handleDateOfBirthChange = (e) => setDateOfBirth(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        firstName,
        lastName,
        username,
        email,
        password,
        street,
        city,
        country,
        postalCode,
        dateOfBirth,
        profilePic,
      };
      await service.post("/auth/signup", newUser);
      navigate("/login");
    } catch (err) {
      //best practices if err.message exists and it is 400
      if(err.response && err.response.status === 400){
        setErrMessage(err.response.data.errMessage)
      }else{
      navigate("/error");
      }
      
    }
  };
  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }

    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);
    try {
      const response = await service.post("/upload", uploadData);

      setProfilePic(response.data.image);

      setIsUploading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div className="details-container">

      <h1>Sign Up </h1>
      <Form onSubmit={handleSignup}>
      <Form.Group className="mb-3">
        <Form.Label>First Name:</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
        />
        </Form.Group>

        <br />
        <Form.Group className="mb-3">

        <Form.Label>Last Name:</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleLastNameChange}
          />
          </Form.Group>

        <br />
        <Form.Group className="mb-3">
          
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          />
          </Form.Group>

        <br />
        <Form.Group className="mb-3">

        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          />
          </Form.Group>

        <br />
        <Form.Group className="mb-3">
          
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          />
          </Form.Group>

        <br />
        <Form.Group className="mb-3">

        <Form.Label>Street:</Form.Label>
        <Form.Control
          type="text"
          name="street"
          value={street}
          onChange={handleStreetChange}
          />
          </Form.Group>

        <br />
        <Form.Group className="mb-3">

        <Form.Label>City:</Form.Label>
        <Form.Control
          type="text"
          name="city"
          value={city}
          onChange={handleCityChange}
          />
          </Form.Group>

        <br />
        <Form.Group className="mb-3">

        <Form.Label>Country:</Form.Label>
        <Form.Control
          type="text"
          name="country"
          value={country}
          onChange={handleCountryChange}
          />
          </Form.Group>

        <br />
        <Form.Group className="mb-3">

        <Form.Label>Postal Code:</Form.Label>
        <Form.Control
          type="number"
          name="postalCode"
          value={postalCode}
          onChange={handlePostalCodeChange}
          />
          </Form.Group>

        <br />
        <Form.Group className="mb-3">

        <Form.Label>Date of Birth:</Form.Label>
        <Form.Control
          type="date"
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={handleDateOfBirthChange}
          />
          </Form.Group>

        <br />
        <Form.Group className="mb-3"></Form.Group>
        <Form.Label htmlFor="profilePic">Profile Pic: </Form.Label>
        <Form.Control
          type="file"
          name="profilePic"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        {isUploading ?  <div className="small-spinner-container">
      <div className="spinner">
        <RingLoader color="red" size={20} />
      </div>
      </div>: null}
        {profilePic ? (<div><img src={profilePic} alt="img" width={200} /></div>) : null}
        <br />

        <Button variant="outline-danger" type="submit">Sign Up</Button>
        
        <p style={{ color: "red" }}>{errMessage}</p>
      </Form>
    </div>
  );
}

export default Signup;
