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
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");

  const [isUploading, setIsUploading] = useState(false);

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
      // console.log(response);
      navigate("/all");
    } catch (err) {
      console.log(err);
      navigate("/error");
    }
  };
  const handleFileUpload = async (event) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

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
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

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
        <textarea
          type="text"
          name="description"
          rows={3}
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
          type="file"
          name="image"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        {isUploading ? <h3>... uploading image</h3> : null}
        {image ? (<div><img src={image} alt="img" width={200} /></div>) : null}
        <br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AdminCreate;
