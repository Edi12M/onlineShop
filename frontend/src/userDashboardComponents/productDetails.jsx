import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams(); // get product ID from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5145/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <img src={`http://localhost:5145${product.imageUrl}`} alt={product.name} />
      <p>Price: ${product.price}</p>
      <p>{product.description || "No description available."}</p>
    </div>
  );
}

export default ProductDetail;
