import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/config";
import { RingLoader } from "react-spinners";
import { Button, Form } from "react-bootstrap";
function AdminCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");

  const [isUploading, setIsUploading] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleSizeChange = (e) => setSize(e.target.value);
  const handleColorChange = (e) => setColor(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      description,
      price,
      size,
      color,
      image,
      category,
    };
    try {
      await service.post("/products/create", newProduct);
      navigate("/all");
    } catch (err) {
      navigate("/error");
    }
  };
  const handleFileUpload = async (event) => {

    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }

    setIsUploading(true); // to start the loading animation

    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", event.target.files[0]);
    //                   |
    //     this name needs to match the name used in the middleware in the backend => uploader.single("image")

    try {
      const response = await service.post("/upload", uploadData);

      setImage(response.data.image);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ image: req.file.path });

      setIsUploading(false); // to stop the loading animation
    } catch (error) {
      navigate("/error");
    }
  };
  const sizeOptions = ["small", "medium", "large"];

  const colorOptions = [
    "black",
    "white",
    "green",
    "yellow",
    "grey",
    "orange",
    "pink",
    "brown",
    "purple",
    "red",
    "blue",
  ];

  const categoryOptions = [
    "skirts",
    "dresses",
    "suits",
    "shirts",
    "trousers",
    "jeans",
    "sport",
    "coats",
    "jackets",
    "hoodies",
    "accessories",
  ];

  return (
    <div className="details-container">

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
        <Form.Label htmlFor="Name">Name: </Form.Label>
        <Form.Control
          type="text"
          name="name"
          onChange={handleNameChange}
          value={name}
        />
        </Form.Group>
        <br />
        <Form.Group className="mb-3">

        <Form-Label htmlFor="description">Description: </Form-Label>
        <Form.Control
        as = "textarea"
          type="text"
          name="description"
          rows={3}
          onChange={handleDescriptionChange}
          value={description}
          />
          </Form.Group>

        <br />
        <Form.Group className="mb-3">
        <Form.Label htmlFor="price">Price: </Form.Label>
        <Form.Control
          type="number"
          name="price"
          onChange={handlePriceChange}
          value={price}
        />
        </Form.Group>
        <br />
        <Form.Group className="mb-3">
        <Form.Label htmlFor="size">Size: </Form.Label>
        <Form.Select name="size" onChange={handleSizeChange} value={size}>
          <option value="">Select Size</option>
          {sizeOptions.map((eachSize, index) => (
            <option key={index} value={eachSize.toLowerCase()}>
              {eachSize}
            </option>
          ))}
        </Form.Select>
        </Form.Group>

        <br />
        <Form.Group className="mb-3">
        <Form.Label htmlFor="color">Color: </Form.Label>
        <Form.Select name="color" onChange={handleColorChange} value={color}>
          <option value="">Select Color</option>
          {colorOptions.map((eachColor, index) => (
            <option key={index} value={eachColor.toLowerCase()}>
              {eachColor}
            </option>
          ))}
        </Form.Select>
        </Form.Group>

        <br />
        <Form.Group className="mb-3">
        <Form.Label htmlFor="category">Category: </Form.Label>
        <Form.Select
          name="category"
          onChange={handleCategoryChange}
          value={category}
        >
          <option value="">Select Category</option>
          {categoryOptions.map((eachCategory, index) => (
            <option key={index} value={eachCategory.toLowerCase()}>
              {eachCategory}
            </option>
          ))}
        </Form.Select>
        </Form.Group>
        <br />
        <Form.Group className="mb-3">
        <Form.Label htmlFor="image">Photo: </Form.Label>
        <Form.Control
          type="file"
          name="image"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        {isUploading ?  <div className="small-spinner-container">
      <div className="spinner">
        <RingLoader color="red" size={20} />
      </div>
      </div> : null}
        {image ? (<div><img src={image} alt="img" width={200} /></div>) : null}
        <br />
        </Form.Group>

        <Button style={{marginTop: "10px"}} variant="outline-danger" type="submit">Add Product</Button>
      </Form>
    </div>
  );
}

export default AdminCreate;
