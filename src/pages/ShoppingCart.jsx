import { useState } from "react";
import { useEffect } from "react";
import service from "../services/config"
import { RingLoader } from "react-spinners";

function ShoppingCart() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(()=>{
    shoppingCartProducts()
  }, [])
  //obtener con la llamada get la info
  const shoppingCartProducts = async () => {
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
    <div>
    <h2>Shopping Cart</h2>
    <div>
      {shoppingCart.map((eachProduct) => (
        <div key={eachProduct._id}>
        <p >{eachProduct.name}</p>
        <img src={eachProduct.image} alt="img" width={200} />
        <p>{eachProduct.price}€</p>
        </div>
        
      ))}
      {/* acumulador: total, eachProduct es cada producto del array y la suma es el acumulador mas el precio de cada producto */}
       <p>Total: {shoppingCart.reduce((total, eachProduct) => total + eachProduct.price, 0)}€</p>
    </div>
  </div>
  )
}

export default ShoppingCart