import React, { useState, useEffect } from "react";
import axios from "axios";
import UserHeader from "./userHeader";
import HeroBanner from "./HeroBanner";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../components/Toast";
import { API_BASE_URL } from "../config";

function UserDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { addToCart } = useCart();
  const toast = useToast();

  const query = new URLSearchParams(location.search);
  const categoryFilter = query.get("category") || "All";
  const searchQuery = query.get("search")?.toLowerCase() || "";
  const isShopPage = location.pathname === "/shop";

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      categoryFilter === "All" || p.category === categoryFilter;
    const matchesSearch =
      searchQuery === "" || p.name.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: "Out of Stock", cls: "stock-out" };
    if (stock <= 5) return { text: `Only ${stock} left`, cls: "stock-low" };
    return { text: "In Stock", cls: "stock-in" };
  };

  return (
    <>
      <UserHeader />

      {!isShopPage && <HeroBanner />}

      {isShopPage && categoryFilter !== "All" && (
        <div className="bg-dark text-white py-4 text-center">
          <h2 className="fw-bold mb-0">{categoryFilter}'s Collection</h2>
        </div>
      )}

      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-3">
          {!isShopPage && (
            <div className="text-center mb-5">
              <h2 className="section-title">Featured Products</h2>
              <p className="section-subtitle">Handpicked styles just for you</p>
            </div>
          )}

          {loading ? (
            <Spinner message="Loading products..." />
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <i
                className="bi bi-search"
                style={{ fontSize: "3rem", color: "#ccc" }}
              ></i>
              <h4 className="mt-3">No products found</h4>
              <p className="text-muted">Try a different search or category.</p>
            </div>
          ) : (
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              {filteredProducts.map((p) => {
                const stock = getStockStatus(p.stock);
                return (
                  <div className="col mb-5" key={p.productId}>
                    <div className="card h-100 product-card">
                      <div className="card-img-wrapper">
                        <Link to={`/product/${p.productId}`}>
                          <img
                            className="card-img-top"
                            src={`${API_BASE_URL}${p.imageUrl}`}
                            alt={p.name}
                            style={{ height: "280px", objectFit: "cover" }}
                          />
                        </Link>
                        <div className="card-img-overlay-badge">
                          <span className="badge bg-dark category-badge">
                            {p.category}
                          </span>
                        </div>
                      </div>

                      <div className="card-body p-4">
                        <div className="text-center">
                          <h5 className="fw-bolder mb-1">{p.name}</h5>
                          <span className={`stock-indicator ${stock.cls}`}>
                            <i
                              className="bi bi-circle-fill me-1"
                              style={{ fontSize: "0.5rem" }}
                            ></i>
                            {stock.text}
                          </span>
                          <p className="price-tag mt-2 mb-0">
                            ${Number(p.price).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center d-flex gap-2 justify-content-center">
                          <Link
                            to={`/product/${p.productId}`}
                            className="btn btn-outline-dark flex-grow-1"
                          >
                            View
                          </Link>
                          <button
                            className="btn btn-dark flex-grow-1"
                            disabled={p.stock === 0}
                            onClick={() => {
                              addToCart(p);
                              toast(`${p.name} added to cart`, "success");
                            }}
                          >
                            <i className="bi bi-cart-plus me-1"></i>Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default UserDashboard;
