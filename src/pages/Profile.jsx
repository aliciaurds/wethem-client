import { useEffect, useState } from "react";
import service from "../services/config";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { RingLoader } from "react-spinners";

function Profile() {
  const [user, setUser] = useState(null);

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


  if (!user) {
      return (
          <div className="spinner-container">
        <div className="spinner">
          <RingLoader color="red" />
        </div>
        </div>
      );
    }
  

  return (
    <div>
      <h2>Profile</h2>
      <div>
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName}</p>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Street: {user.street}</p>
        <p>City: {user.city}</p>
        <p>Country: {user.country}</p>
        <p>Postal Code: {user.postalCode}</p>
        {/* Libreria date-fns para las fechas */}
        <p>Date of Birth: {format(new Date(user.dateOfBirth), "dd/MM/yyyy")}</p>
        <img src={user.profilePic} alt="profilePic" width={300} /><br />
        <Link to={"/profile/edit"}>
         <button>Edit Profile</button> </Link>
      </div>
    </div>
  );
}

export default Profile;