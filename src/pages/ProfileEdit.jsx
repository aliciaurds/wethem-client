import { useState, useEffect } from 'react';
import service from '../services/config';
import { useNavigate } from 'react-router-dom';
import { RingLoader } from "react-spinners";
import { Button, Form } from 'react-bootstrap';

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
    <div className='details-container'>
      <h2>Edit Profile</h2>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className= "mb-3"  >
        <Form.Label>First Name: </Form.Label>
        <Form.Control type="text" name="firstName" value={user.firstName} onChange={handleInputChange} /> <br/>
        </Form.Group>
        <Form.Group className= "mb-3"  >
        <Form.Label>Last Name: </Form.Label>
        <Form.Control type="text" name="lastName" value={user.lastName} onChange={handleInputChange} /> <br/>
        </Form.Group>
        <Form.Group className= "mb-3"  >
        <Form.Label>Username: </Form.Label>
        <Form.Control type="text" name="username" value={user.username} onChange={handleInputChange} /> <br/>
        </Form.Group>
        <Form.Group className= "mb-3"  >
        <Form.Label>Email: </Form.Label>
        <Form.Control type="email" name="email" value={user.email} onChange={handleInputChange} /> <br/>
        </Form.Group>
        <Form.Group className= "mb-3"  >
        <Form.Label>Street: </Form.Label>
        <Form.Control type="text" name="street" value={user.street} onChange={handleInputChange} /> <br/>
        </Form.Group>
        <Form.Group className= "mb-3"  >
        <Form.Label>City: </Form.Label>
        <Form.Control type="text" name="city" value={user.city} onChange={handleInputChange} /> <br/>
        </Form.Group>
        <Form.Group className= "mb-3"  >
        <Form.Label>Country: </Form.Label>
        <Form.Control type="text" name="country" value={user.country} onChange={handleInputChange} /> <br/>
        </Form.Group>
        <Form.Group className= "mb-3"  >
        <Form.Label>Postal Code: </Form.Label>
        <Form.Control type="text" name="postalCode" value={user.postalCode} onChange={handleInputChange} /> <br/>
        </Form.Group>
        <Form.Group className= "mb-3"  >
        <Form.Label>Date of Birth: </Form.Label>
        <Form.Control
        type="date"
        name="dateOfBirth"
        value=  {new Date(user.dateOfBirth).toISOString().split("T")[0]}
        onChange={handleInputChange}/> <br/>
        </Form.Group>
        <Button className='btn-form' variant="outline-danger" type="submit">Save Changes</Button>
        </Form>
      <Form onSubmit={handleFormSubmit}>
      <Form.Group className= "mb-3"  >
        <Form.Label htmlFor="image">Profile Picture: </Form.Label>
        <Form.Control
          type="file"
          name="image"
          onChange={handleFileUpload}
          disabled={isUploading}
        /> <br />
         </Form.Group>
        {isUploading ? <div className="small-spinner-container">
      <div className="spinner">
        <RingLoader color="red" size={20} />
      </div>
      </div> : null}
        {image ? (<div><img src={image} alt="img" width={200} /></div>) : null}
        <Button className='btn-form' variant="outline-danger" type="submit">Upload Picture</Button>
      </Form>
      <Form onSubmit={handlePasswordFormSubmit}>
        <h3>Change Password</h3>
        <Form.Group className= "mb-3"  >
        <Form.Label>New Password: </Form.Label>
        <Form.Control
          type="password"
          value={newPassword}
          onChange={handlePasswordInputChange}
        /><br />
        </Form.Group>

        <Button className='btn-form' variant="outline-danger" type="submit">Change Password</Button>
      </Form>
    </div>
    
  );
}

export default ProfileEdit;