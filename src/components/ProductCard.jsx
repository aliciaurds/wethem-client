function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <img src={product.image} alt={product.name} width={200}/>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <p>{product.size}</p>
      <p>{product.color}</p>
      <p>{product.category}</p>
    </div>
  );
}

export default ProductCard;