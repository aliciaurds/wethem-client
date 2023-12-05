import { useState } from "react";
import { useEffect } from "react";
import service from "../services/config"
import { RingLoader } from "react-spinners";

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
      console.log(response.data);
      setWishList(response.data)
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
    <h2>Wishlist</h2>
      {wishList.map((eachProduct) => (
        <div key={eachProduct._id}>
        <p>{eachProduct.name}</p>
        <img src={eachProduct.image} alt="img" width={200} />
        </div>
        
      ))}
  
  </div>
  )
}
//TODO añadir boton para eliminar de la lista
export default wishList