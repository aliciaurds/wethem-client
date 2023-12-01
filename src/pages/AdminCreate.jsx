import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/config";

function AdminCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleSizeChange = (e) => setSize(e.target.value);
  const handleColorChange = (e) => setColor(e.target.value);
  const handleImageChange = (e) => setImage(e.target.value);
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
      const response = await service.post("/products/create", newProduct);
      console.log(response);
      navigate("/all")
    } catch (err) {
      console.log(err);
      navigate("/error");
    }
  };
  const sizeOptions = ["Small", "Medium", "Large"];

  const colorOptions = [
    "Black",
    "White",
    "Green",
    "Yellow",
    "Grey",
    "Orange",
    "Pink",
    "Grey",
    "Brown",
    "Purple",
    "Red",
  ];

  const categoryOptions = [
    "Skirts",
    "Dresses",
    "Suits",
    "Shirts",
    "Trousers",
    "Jeans",
    "Sport",
    "Coats",
    "Sweaters and Jackets",
    "Accessories",
  ];

  return (
    <div>
      <h3>New Products Form</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="Name">Name: </label>
        <input
          type="text"
          name="name"
          onChange={handleNameChange}
          value={name}
        />

        <br />

        <label htmlFor="description">Description: </label>
        <input
          type="text"
          name="description"
          onChange={handleDescriptionChange}
          value={description}
        />

        <br />
        <label htmlFor="price">Price: </label>
        <input
          type="number"
          name="price"
          onChange={handlePriceChange}
          value={price}
        />

        <br />
        <label htmlFor="size">Size: </label>
        <select name="size" onChange={handleSizeChange} value={size}>
          <option value="">Select Size</option>
          {sizeOptions.map((eachSize, index) => (
            <option key={index} value={eachSize.toLowerCase()}>
              {eachSize}
            </option>
          ))}
        </select>

        <br />
        <label htmlFor="color">Color: </label>
        <select name="color" onChange={handleColorChange} value={color}>
          <option value="">Select Color</option>
          {colorOptions.map((eachColor, index) => (
            <option key={index} value={eachColor.toLowerCase()}>
              {eachColor}
            </option>
          ))}
        </select>

        <br />
        <label htmlFor="category">Category: </label>
        <select
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
        </select>
        <br />
        <label htmlFor="image">Photo: </label>
        <input
          type="text"
          name="image"
          onChange={handleImageChange}
          value={image}
        />

        <br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AdminCreate;
