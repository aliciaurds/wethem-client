import { useState, useEffect } from 'react';
import service from '../services/config';
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";

function ProfileEdit() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    street: '',
    city: '',
    country: '',
    postalCode: '',
    dateOfBirth: '',
    profilePic: '',
  });

  useEffect(() => {
    userData();
  }, []);

  const userData = async () => {
    try {
      const response = await service.get('/profile');
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.put('/profile/edit', user);
      navigate('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleFormSubmit}>
        <label>First Name:</label>
        <input type="text" name="firstName" value={user.firstName} onChange={handleInputChange} /> <br/>
        <label>Last Name:</label>
        <input type="text" name="lastName" value={user.lastName} onChange={handleInputChange} /> <br/>

        <label>Username:</label>
        <input type="text" name="username" value={user.username} onChange={handleInputChange} /> <br/>

        <label>Email:</label>
        <input type="email" name="email" value={user.email} onChange={handleInputChange} /> <br/>

        <label>Street:</label>
        <input type="text" name="street" value={user.street} onChange={handleInputChange} /> <br/>

        <label>City:</label>
        <input type="text" name="city" value={user.city} onChange={handleInputChange} /> <br/>

        <label>Country:</label>
        <input type="text" name="country" value={user.country} onChange={handleInputChange} /> <br/>

        <label>Postal Code:</label>
        <input type="text" name="postalCode" value={user.postalCode} onChange={handleInputChange} /> <br/>

        <label>Date of Birth:</label>
        <input
        type="date"
        name="dateOfBirth"
        value={user.dateOfBirth}
        onChange={handleInputChange}/> <br/>

        <label>Profile Picture:</label>
        <input type="text" name="profilePic" value={user.profilePic} onChange={handleInputChange} /> <br/>

        

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default ProfileEdit;