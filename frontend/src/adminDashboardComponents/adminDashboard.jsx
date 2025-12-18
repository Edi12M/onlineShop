import { useState, useEffect } from "react";
import axios from "axios";
import AdminUpload from "./adminUpload";
import Modal from "./Modal";
import Logo from "../commonComponents/logo";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";
import { API_BASE_URL } from "../config";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const toast = useToast();

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUploadSuccess = (newProduct) => {
    if (editProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.productId === newProduct.productId ? newProduct : p,
        ),
      );
      toast("Product updated successfully!", "success");
    } else {
      setProducts((prev) => [newProduct, ...prev]);
      toast("Product uploaded successfully!", "success");
    }
    setShowUpload(false);
    setEditProduct(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await axios.delete(`${API_BASE_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p.productId !== id));
      toast("Product deleted successfully!", "success");
    } catch (err) {
      console.error("Failed to delete product:", err);
      toast("Failed to delete product", "error");
    }
  };

  const filteredProducts = searchTerm
    ? products.filter(
        (p) =>
          p.productId.toString().includes(searchTerm) ||
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : products;

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container px-4 px-lg-5 d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <Logo />
            <span className="text-white fs-5 fw-semibold ms-3">
              Admin Panel
            </span>
          </div>
          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            <i className="bi bi-box-arrow-right me-1"></i>Sign Out
          </button>
        </div>
      </nav>

      <section className="py-4 bg-light" style={{ minHeight: "80vh" }}>
        <div className="container px-4 px-lg-5">
          <div className="admin-stats">
            <div className="stat-card">
              <div
                className="stat-icon"
                style={{ background: "#e3f2fd", color: "#1976d2" }}
              >
                <i className="bi bi-box-seam"></i>
              </div>
              <div className="stat-value">{products.length}</div>
              <div className="stat-label">Total Products</div>
            </div>
            <div className="stat-card">
              <div
                className="stat-icon"
                style={{ background: "#e8f5e9", color: "#388e3c" }}
              >
                <i className="bi bi-stack"></i>
              </div>
              <div className="stat-value">{totalStock}</div>
              <div className="stat-label">Total Stock</div>
            </div>
            <div className="stat-card">
              <div
                className="stat-icon"
                style={{ background: "#fff3e0", color: "#f57c00" }}
              >
                <i className="bi bi-cash-stack"></i>
              </div>
              <div className="stat-value">${totalValue.toFixed(0)}</div>
              <div className="stat-label">Inventory Value</div>
            </div>
            <div className="stat-card">
              <div
                className="stat-icon"
                style={{ background: "#f3e5f5", color: "#7b1fa2" }}
              >
                <i className="bi bi-tags"></i>
              </div>
              <div className="stat-value">{categories.length}</div>
              <div className="stat-label">Categories</div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="input-group" style={{ maxWidth: "400px" }}>
              <span className="input-group-text bg-white">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, ID, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setSearchTerm("")}
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>

            <button
              className="btn btn-dark"
              onClick={() => {
                setEditProduct(null);
                setShowUpload(true);
              }}
            >
              <i className="bi bi-plus-lg me-2"></i>Add Product
            </button>
          </div>

          {showUpload && (
            <Modal
              title={editProduct ? "Edit Product" : "Add Product"}
              onClose={() => {
                setShowUpload(false);
                setEditProduct(null);
              }}
            >
              <AdminUpload
                onUploadSuccess={handleUploadSuccess}
                editProduct={editProduct}
                token={token}
              />
            </Modal>
          )}

          {loading ? (
            <Spinner message="Loading products..." />
          ) : (
            <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div className="col mb-4" key={product.productId}>
                    <div className="card h-100 product-card">
                      <div className="card-img-wrapper">
                        <img
                          className="card-img-top"
                          src={`${API_BASE_URL}${product.imageUrl}`}
                          alt={product.name}
                          style={{ height: "250px", objectFit: "cover" }}
                        />
                        <div className="card-img-overlay-badge">
                          <span className="badge bg-dark category-badge">
                            {product.category}
                          </span>
                        </div>
                      </div>
                      <div className="card-body p-3">
                        <div className="text-center">
                          <h6 className="fw-bold mb-1">{product.name}</h6>
                          <small className="text-muted d-block">
                            ID: {product.productId}
                          </small>
                          <p className="price-tag my-1">
                            ${Number(product.price).toFixed(2)}
                          </p>
                          <small className="text-muted">
                            Stock: {product.stock}
                          </small>
                        </div>
                      </div>
                      <div className="card-footer p-3 pt-0 border-top-0 bg-transparent">
                        <div className="d-flex gap-2 justify-content-center">
                          <button
                            className="btn btn-outline-dark btn-sm flex-grow-1"
                            onClick={() => {
                              setEditProduct(product);
                              setShowUpload(true);
                            }}
                          >
                            <i className="bi bi-pencil me-1"></i>Edit
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm flex-grow-1"
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
                <div className="text-center py-5">
                  <i
                    className="bi bi-inbox"
                    style={{ fontSize: "3rem", color: "#ccc" }}
                  ></i>
                  <h4 className="mt-3">No products found</h4>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default AdminDashboard;
