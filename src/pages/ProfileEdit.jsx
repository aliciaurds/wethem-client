import { useState, useEffect } from 'react';
import service from '../services/config';
import { useNavigate } from 'react-router-dom';
import { RingLoader } from "react-spinners";

function ProfileEdit() {
  const navigate = useNavigate();
  //aqui almacenamos en un solo estado el objeeto user, se reduce codigo ya que no hay que crear un estado por variable ni una funcion de cambio
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
  const [image, setImage] = useState(null)
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    userData();
  }, []);

  const userData = async () => {
    try {
      const response = await service.get('/profile');
      console.log(response.data);
      setLoading(false)
      setUser(response.data);
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  };

  const handleInputChange = (e) => {
    //toma la informacion de name y value del evento, donde name es el nombre del campo y value su valor
    const { name, value } = e.target;
    //se toma el objeto user actual (el estado anterior) y crea una copia de este objeto utilizando el operador de propagación (...). Luego, actualiza el valor ([name]) en esta copia con el nuevo valor (value) 
    
    setUser({ ...user, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      //actualizacion de propiedades para la vista de profile
      const formData = new FormData();
      formData.append('image', image)
      //llamada al BE con los datos del estado user
      await service.put('/profile/edit', user);
      navigate('/profile');
    } catch (error) {
      console.error(error);
    }
  };
  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }

    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append('image', event.target.files[0]);
    try {
      const response = await service.post('/upload', uploadData);

      setImage(response.data.image);

      setUser({ ...user, profilePic: response.data.image });

      setIsUploading(false);
    } catch (error) {
      navigate('/error');
    }
  };
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordInputChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handlePasswordFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Lógica para enviar la nueva contraseña al backend
      await service.put('auth/change-password', { newPassword });
      // Restablecer el estado del formulario después de actualizar la contraseña
      setNewPassword('');
      navigate('/profile');
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return (
      <div className="small-spinner-container">
        <div className="spinner">
          <RingLoader color="red" size={20} />
        </div>
      </div>
    );
  }
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

        <label>Date of Birth: </label>
        <input
        type="date"
        name="dateOfBirth"
        value=  {new Date(user.dateOfBirth).toISOString().split("T")[0]}
        onChange={handleInputChange}/> <br/>

        <button type="submit">Save Changes</button>
        </form>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="image">Profile Picture: </label>
        <input
          type="file"
          name="image"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        {isUploading ? <div className="small-spinner-container">
      <div className="spinner">
        <RingLoader color="red" size={20} />
      </div>
      </div> : null}
        {image ? (<div><img src={image} alt="img" width={200} /></div>) : null}
        <button type="submit">Upload Picture</button>
      </form>
      <form onSubmit={handlePasswordFormSubmit}>
        <h3>Change Password</h3>
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={handlePasswordInputChange}
        /><br />

        <button type="submit">Change Password</button>
      </form>
    </div>
    
  );
}

export default ProfileEdit;