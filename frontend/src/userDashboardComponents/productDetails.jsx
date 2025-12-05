import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import UserHeader from "./userHeader";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import { useCart } from "../context/CartContext";
import { useToast } from "../components/Toast";
import { API_BASE_URL } from "../config";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const toast = useToast();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product)
    return (
      <>
        <UserHeader />
        <Spinner message="Loading product details..." />
      </>
    );

  const inStock = product.stock > 0;

  return (
    <>
      <UserHeader />
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img
                className="img-fluid rounded shadow"
                src={`${API_BASE_URL}${product.imageUrl}`}
                alt={product.name}
                style={{
                  maxHeight: "500px",
                  objectFit: "cover",
                  width: "100%",
                }}
              />
            </div>
            <div className="col-md-6">
              <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/user-dashboard" className="text-dark">
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link
                      to={`/shop?category=${product.category}`}
                      className="text-dark"
                    >
                      {product.category}
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">{product.name}</li>
                </ol>
              </nav>

              <span className="badge bg-dark category-badge mb-3">
                {product.category}
              </span>

              <h1 className="display-5 fw-bolder">{product.name}</h1>

              <div className="fs-3 mb-3">
                <span className="fw-bold">
                  ${Number(product.price).toFixed(2)}
                </span>
              </div>

              <div className="mb-3">
                {inStock ? (
                  <span className="stock-indicator stock-in">
                    <i className="bi bi-check-circle-fill me-1"></i>
                    In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="stock-indicator stock-out">
                    <i className="bi bi-x-circle-fill me-1"></i>
                    Out of Stock
                  </span>
                )}
              </div>

              <p className="lead mb-4">
                {product.description || "No description available."}
              </p>

              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="quantity-selector">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!inStock}
                  >
                    −
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    disabled={!inStock}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn-add-cart"
                  disabled={!inStock}
                  onClick={() => {
                    addToCart(product, quantity);
                    toast(
                      `Added ${quantity}x ${product.name} to cart`,
                      "success",
                    );
                  }}
                >
                  <i className="bi bi-cart-plus me-2"></i>
                  Add to Cart
                </button>
              </div>

              <Link to="/user-dashboard" className="btn btn-outline-dark">
                <i className="bi bi-arrow-left me-2"></i>Back to Shop
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ProductDetail;
