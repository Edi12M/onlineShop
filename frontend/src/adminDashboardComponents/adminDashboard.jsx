import { useState, useEffect } from "react";
import axios from "axios";
import AdminUpload from "./AdminUpload";
import Modal from "../adminDashboardComponents/Modal";
import Logo from "../commonComponents/logo";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [showUpload, setShowUpload] = useState(false);

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

  const handleUploadSuccess = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
    setShowUpload(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5145/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.productId !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Failed to delete product");
    }
  };

  const filteredProducts = searchId
    ? products.filter((p) => p.productId.toString() === searchId)
    : products;

  return (
    <>
      {/* Admin Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container px-4 px-lg-5">
          <Logo />
          <h3 className="text-white ms-3 mb-0">Admin Dashboard</h3>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#adminNavbar"
            aria-controls="adminNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      {/* Page Section */}
      <section className="py-5 bg-light">
        <div className="container px-4 px-lg-5 mt-5">
          {/* Search & Upload Controls */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="input-group w-50">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Product ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <button
                className="btn btn-outline-dark"
                type="button"
                onClick={() => setSearchId("")}
              >
                Clear
              </button>
            </div>

            <button
              className="btn btn-dark"
              onClick={() => setShowUpload(true)}
            >
              <i className="bi bi-upload me-2"></i>Upload Product
            </button>
          </div>

          {/* Upload Modal */}
          {showUpload && (
            <Modal onClose={() => setShowUpload(false)}>
              <AdminUpload onUploadSuccess={handleUploadSuccess} />
            </Modal>
          )}

          {/* Product Grid */}
          <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div className="col mb-5" key={product.productId}>
                  <div className="card h-100 shadow-sm">
                    <img
                      className="card-img-top"
                      src={`http://localhost:5145${product.imageUrl}`}
                      alt={product.name}
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <div className="card-body p-4">
                      <div className="text-center">
                        <h5 className="fw-bolder">{product.name}</h5>
                        <p className="mb-1">ID: {product.productId}</p>
                        <p className="mb-1">Category: {product.category}</p>
                        <p className="text-success fw-semibold">
                          ${product.price}
                        </p>
                        <p className="small text-muted">
                          Stock: {product.stock}
                        </p>
                        <p className="text-secondary small">
                          {product.description || "No description"}
                        </p>
                      </div>
                    </div>
                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                      <div className="text-center">
                        <button
                          className="btn btn-outline-danger mt-auto"
                          onClick={() => handleDelete(product.productId)}
                        >
                          <i className="bi bi-trash me-1"></i>Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminDashboard;
