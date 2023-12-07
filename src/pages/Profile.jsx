import { useContext, useEffect, useState } from "react";
import service from "../services/config";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { RingLoader } from "react-spinners";
import { AuthContext } from "../context/auth.context";
import { Button } from "react-bootstrap";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  const {authenticateUser } = useContext(AuthContext)

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
  const handleLogOut = () =>{
    localStorage.removeItem("authToken");
    //invoke again authenticateUser because once I remove the tokens the states will be changed to false
    authenticateUser()

    navigate("/")
  }
  const deleteAccount = async () => {
    try {
      await service.delete('/profile/delete-account');
      //despues de eliminar la cuenta tambien hay que cerrar sesion 
      handleLogOut()
      navigate("/")
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
    <div className="details-container">
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
         <Button className = "btn-form" variant="outline-danger">Edit Profile</Button> </Link> <br />
         <Button variant="outline-danger" onClick={deleteAccount}>Delete Account</Button>
      </div>
    </div>
  );
}

export default Profile;