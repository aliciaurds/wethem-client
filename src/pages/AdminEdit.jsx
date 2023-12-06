import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/config";
import { RingLoader } from "react-spinners";
function AdminEdit() {
  const params = useParams();
  console.log(params.productId);
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

  useEffect(() => {
    productData();
  }, []);

  const productData = async () => {
    try {
      const response = await service.get(
        `/products/${params.productId}/details`
      );
      // console.log(response);
      setName(response.data.name);
      setDescription(response.data.description);
      setPrice(response.data.price);
      setSize(response.data.size);
      setColor(response.data.color);
      setImage(response.data.image);
      setCategory(response.data.category);
    } catch (err) {
      console.log(err);
      navigate("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      name,
      description,
      price,
      size,
      color,
      image,
      category,
    };
    try {
      await service.put(`/products/${params.productId}/update`, updatedProduct);
      navigate(`/products/${params.productId}/details`);
    } catch (err) {
      console.log(err);
      navigate("/error");
    }
  };
  const handleDelete = async () => {
    try {
      await service.delete(`/products/${params.productId}/delete`);
      navigate("/all");
    } catch (err) {
      console.log(err);
      navigate("/error");
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

      setImage(response.data.image);

      setIsUploading(false);
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
        <button type="submit">Update</button>
      </form>
      <form onSubmit={handleSubmit}>
        <label htmlFor="image">Photo: </label>
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
      </div>: null}
        {image ? (<div><img src={image} alt="img" width={200} /></div>) : null}
        <button type="submit">Upload Picture</button>
      </form>
      <button
        onClick={handleDelete}
        style={{ backgroundColor: "darkred", color: "white", border: "none" }}
        type="submit"
      >
        Delete
      </button>
    </div>
  );
}

export default AdminEdit;
