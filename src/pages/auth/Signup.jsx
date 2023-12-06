import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config";
import { RingLoader } from "react-spinners";
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
    <div>
      <hr />
      <h1>Sign Up </h1>

      <form onSubmit={handleSignup}>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
        />

        <br />

        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleLastNameChange}
        />

        <br />

        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <br />

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

        <label>Street:</label>
        <input
          type="text"
          name="street"
          value={street}
          onChange={handleStreetChange}
        />

        <br />

        <label>City:</label>
        <input
          type="text"
          name="city"
          value={city}
          onChange={handleCityChange}
        />

        <br />

        <label>Country:</label>
        <input
          type="text"
          name="country"
          value={country}
          onChange={handleCountryChange}
        />

        <br />

        <label>Postal Code:</label>
        <input
          type="number"
          name="postalCode"
          value={postalCode}
          onChange={handlePostalCodeChange}
        />

        <br />

        <label>Date of Birth:</label>
        <input
          type="date"
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={handleDateOfBirthChange}
        />

        <br />

        <label htmlFor="profilePic">Profile Pic: </label>
        <input
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

        <button type="submit">Sign Up</button>
        
        <p style={{ color: "red" }}>{errMessage}</p>
      </form>
    </div>
  );
}

export default Signup;
