import { useState } from "react";
import { useEffect } from "react";
import service from "../services/config"
import { RingLoader } from "react-spinners";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function wishList() {
  //crear estado que se inicialice en array vacio para almacenar la lista
  const [wishList, setWishList] = useState([]);
  //comprobar loading
  const [isLoading, setIsLoading] = useState(true)
  //aplicable cada vez que se renderiza:
  useEffect(()=>{
    wishListProducts()
  }, [])
  //obtener con la llamada get la info
  const wishListProducts = async () => {
    try {
      const response = await service.get("/profile/wishlist")

      setWishList(response.data)
      setIsLoading(false)
    }
    catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }
  const removeFromWishlist = async (productId) => {
    try {
      // Realizar la llamada para eliminar el producto de la lista de deseos
      await service.patch(`/profile/wishlist/${productId}/remove`);
  
      //el filter crea un nuevo array con todos los productos salvo los eliminados, asi que si el id del producto es diferente del id a eliminar la condicion se cumple y por tanto se incluye en el nuevo array
      const updatedWishList = wishList.filter((eachProduct) => eachProduct._id !== productId);
      // Actualizar el estado para reflejar el cambio eliminando el producto de la lista
      setWishList(updatedWishList)
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
    <div className="product-list">
      {wishList.map((eachProduct) => (
        <div key={eachProduct._id}>
        <Link  to={`/products/${eachProduct._id}/details`} className="product-link">
        <ProductCard product={eachProduct} />
      </Link>
        <Button variant = "outline-danger" onClick={() => removeFromWishlist(eachProduct._id)}>
          Remove
        </Button>
        </div>
        
      ))}
      </div>
  )
}
//TODO añadir boton para eliminar de la lista
export default wishList