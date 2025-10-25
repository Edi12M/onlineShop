import React, { useState, useEffect } from "react";
import axios from "axios";
import UserHeader from "./userHeader";
import { Link, useLocation } from "react-router-dom";

function UserDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Read category and search query from URL
  const query = new URLSearchParams(location.search);
  const categoryFilter = query.get("category") || "All";
  const searchQuery = query.get("search")?.toLowerCase() || "";

  useEffect(() => {
    axios
      .get("http://localhost:5145/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products available.</p>;

  // Filter products by category and search query
  const filteredProducts = products.filter((p) => {
    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
    const matchesSearch = searchQuery === "" || p.name.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Navbar */}
      <UserHeader />

      {/* Page Content */}
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {filteredProducts.length === 0 ? (
              <p>No products found.</p>
            ) : (
              filteredProducts.map((p) => (
                <div className="col mb-5" key={p.productId}>
                  <div className="card h-100">
                    <Link to={`/product/${p.productId}`}>
                      <img
                        className="card-img-top"
                        src={`http://localhost:5145${p.imageUrl}`}
                        alt={p.name}
                        style={{ height: "250px", objectFit: "cover" }}
                      />
                    </Link>

                    <div className="card-body p-4">
                      <div className="text-center">
                        <h5 className="fw-bolder">{p.name}</h5>
                        ${p.price}
                      </div>
                    </div>

                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                      <div className="text-center">
                        <Link
                          to={`/product/${p.productId}`}
                          className="btn btn-outline-dark mt-auto"
                        >
                          View Product
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default UserDashboard;
