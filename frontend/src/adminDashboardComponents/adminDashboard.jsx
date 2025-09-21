import { useState, useEffect } from "react";
import axios from "axios";
import AdminUpload from "./adminUpload"

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5145/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5145/api/products/${id}`);
      alert("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Failed to delete product");
    }
  };

  // Filter products by ID
  const filteredProducts = searchId
    ? products.filter(p => p.productId.toString() === searchId)
    : products;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by Product ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={() => setShowUpload(!showUpload)}>
          {showUpload ? "Close Upload" : "Upload Product"}
        </button>
      </div>

      {showUpload && <AdminUpload onUploadSuccess={fetchProducts} />}

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.productId} className="product-card">
              <img
                src={`http://localhost:5145${product.imageUrl}`}
                alt={product.name}
                className="product-img"
              />
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              <p>Category: {product.category}</p>
              <p>{product.description}</p>
              <button onClick={() => handleDelete(product.productId)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
