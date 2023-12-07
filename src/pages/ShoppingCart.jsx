import { useState } from "react";
import { useEffect } from "react";
import service from "../services/config"
import { RingLoader } from "react-spinners";
import PaymentIntent from "../components/PaymentIntent";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function ShoppingCart() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  //*Stripes:
  const [showPaymentIntent, setShowPaymentIntent] = useState(false)
  useEffect(()=>{
    getShoppingCartProducts()
  }, [])
  //obtener con la llamada get la info
  const getShoppingCartProducts = async () => {
    try {
      const response = await service.get("/profile/shoppingCart")
      console.log(response.data);
      setShoppingCart(response.data)
      setIsLoading(false)
    }
    catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }
  const removeFromShoppingCart = async (productId) => {
    try {
      await service.patch(`/profile/shoppingCart/${productId}/remove`);
      getShoppingCartProducts()
  
    } catch (error) {
      console.log(error);

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
    //renderizar un map por cada elemento del array para ver el nombre y la imagen 
    <div className="details-container">
    <div className="product-list">
      {shoppingCart.map((eachProduct) => (
        <div key={eachProduct._id}>
        <Link  to={`/products/${eachProduct._id}/details`} className="product-link">
        <ProductCard product={eachProduct} />
      </Link>
        <p>{eachProduct.price}€</p>
        <button onClick={() => removeFromShoppingCart(eachProduct._id)}>
          Remove
        </button>
        </div>
        
      ))}
      {/* acumulador: total, eachProduct es cada producto del array y la suma es el acumulador mas el precio de cada producto */}
    </div>
       <p>Total: {shoppingCart.reduce((total, eachProduct) => total + eachProduct.price, 0)}€</p>
    <div>
  { 
    showPaymentIntent === false
    ? <button onClick={() => setShowPaymentIntent(true)}>Purchase</button> 
    : <PaymentIntent productsToBuy={shoppingCart}/> 
  }
</div>
  </div>
  )
}

export default ShoppingCart