import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../services/config";
import { RingLoader } from "react-spinners";

function ProductDetails() {
  const navigate = useNavigate()
  const params = useParams()
  // console.log(params);

//Create state
  const [details, setDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(()=>{
  productData()
  },[])


  const productData = async () => {
    try {
      const response = await service.get(
        `/products/${params.productId}/details`
      );
      // console.log(response);
      setDetails(response.data);
      setIsLoading(false)
    } catch (err) {
      // console.log(err);
      navigate("/error")
    }
  };

  if (isLoading) {
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
      <h3>{details.name}</h3>
      <img src={details.image} alt="clothesPicture" /><br />
      <p>Description: {details.description}</p> 
      <p>{details.price} €</p>
      <p>Size: {details.size}</p>
      <p>Color: {details.color}</p>
      <Link to={`/products/${details._id}/update`} ><button>Update Product</button></Link>
    </div>
  );
}

export default ProductDetails;