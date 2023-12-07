import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import service from "../services/config";
import { RingLoader } from "react-spinners";
//import components
import ProductCard from "../components/ProductCard";
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
      <div className="product-list">
        {allProducts.map((eachProduct) => (
          <Link key={eachProduct._id} to={`/products/${eachProduct._id}/details`} className="product-link">
            <ProductCard product={eachProduct} />
          </Link>
        ))}
      </div>
  )
}

export default AllProducts