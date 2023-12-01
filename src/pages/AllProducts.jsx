import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import service from "../services/config";
import { RingLoader } from "react-spinners";
function AllProducts() {
  const [allProducts, setAllProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/products");
      setAllProducts(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
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
      <h3>All Products</h3>
      {allProducts.map((eachProduct) => {
        return (
          <div key={eachProduct._id}>
            <Link to={`/products/${eachProduct._id}/details`} >{eachProduct.name}</Link>
          </div>
        );
      })}
    </div>
  )
}

export default AllProducts