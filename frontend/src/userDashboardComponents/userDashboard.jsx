import React, { useState, useEffect } from "react";
import axios from "axios";
import UserHeader from "./userHeader";
import { Link } from "react-router-dom"; // ✅ import at top

function UserDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5145/api/products")
      .then(res => setProducts(res.data))
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products available.</p>;

  return (
    <div className="dashboard-page">
      <header className="userHead">
        <UserHeader />
      </header>

      <div className="product-grid">
        {products.map(p => (
          <Link key={p.productId} to={`/product/${p.productId}`} className="product-card-link">
            <div className="product-card">
              <img src={`http://localhost:5145${p.imageUrl}`} alt={p.name} />
              <h3>{p.name}</h3>
              <p>${p.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;
