// Para filtrar los productos por categoría necesito usar algún estado para almacenar la categoría seleccionada y luego mostrar los productos que coincidan con esa categoría.
//Para esto voy a tener que usar mi componente de product card
//yo lo que quiero es que si me voy a "category/:categoryName" me salgan todos los productos donde product.category sea igual al :category name
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard"; 
import service from "../services/config";

function CategoriesDetails() {
  const params = useParams(); 
  console.log(params.category);
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
   

    productsByCategory();
  }, [params.category]);
      // Lógica para obtener los productos de la categoría seleccionada
      const productsByCategory = async () => {
        try {
          const response = await service.get(`/products?category=${params.category}`); // utilizando la ruta /products seguido de un query parameter category. 
          setCategoryProducts(response.data);// Actualizamos el estado con los productos filtrados
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div>
      <h2>Products in {params.category}</h2>
      <div>
        {categoryProducts.map((eachProduct) => (
          <ProductCard key={eachProduct._id} product={eachProduct} />
        ))}
      </div>
    </div>
  );
}

export default CategoriesDetails;

