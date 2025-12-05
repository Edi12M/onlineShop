import { useCart } from "../context/CartContext";
import { useToast } from "../components/Toast";
import UserHeader from "./userHeader";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } =
    useCart();
  const toast = useToast();

  if (cartItems.length === 0) {
    return (
      <>
        <UserHeader />
        <div
          className="container py-5 text-center"
          style={{ minHeight: "60vh" }}
        >
          <i
            className="bi bi-cart-x"
            style={{ fontSize: "4rem", color: "#ccc" }}
          ></i>
          <h2 className="mt-3 fw-bold">Your cart is empty</h2>
          <p className="text-muted">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/user-dashboard" className="btn btn-dark mt-3 px-4">
            <i className="bi bi-arrow-left me-2"></i>Continue Shopping
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <UserHeader />
      <section className="py-5" style={{ minHeight: "60vh" }}>
        <div className="container">
          <h2 className="fw-bold mb-4">
            <i className="bi bi-cart3 me-2"></i>Shopping Cart
          </h2>
          <div className="row">
            <div className="col-lg-8">
              {cartItems.map((item) => (
                <div
                  className="card mb-3 border-0 shadow-sm"
                  key={item.productId}
                >
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-2 col-3">
                        <img
                          src={`${API_BASE_URL}${item.imageUrl}`}
                          alt={item.name}
                          className="img-fluid rounded"
                          style={{
                            height: "80px",
                            objectFit: "cover",
                            width: "100%",
                          }}
                        />
                      </div>
                      <div className="col-md-3 col-9">
                        <h6 className="fw-bold mb-1">{item.name}</h6>
                        <small className="text-muted">{item.category}</small>
                      </div>
                      <div className="col-md-3 col-6 mt-2 mt-md-0">
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                          >
                            −
                          </button>
                          <span className="mx-3 fw-semibold">
                            {item.quantity}
                          </span>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2 col-3 mt-2 mt-md-0">
                        <span className="fw-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <div className="col-md-2 col-3 mt-2 mt-md-0 text-end">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => {
                            removeFromCart(item.productId);
                            toast(`${item.name} removed from cart`, "info");
                          }}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-lg-4">
              <div
                className="card border-0 shadow-sm sticky-top"
                style={{ top: "80px" }}
              >
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-3">Order Summary</h5>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">
                      Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)}{" "}
                      items)
                    </span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Shipping</span>
                    <span className="text-success fw-semibold">Free</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-4">
                    <strong className="fs-5">Total</strong>
                    <strong className="fs-5">${cartTotal.toFixed(2)}</strong>
                  </div>
                  <button className="btn btn-dark w-100 btn-lg mb-3">
                    <i className="bi bi-lock me-2"></i>Checkout
                  </button>
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={() => {
                      clearCart();
                      toast("Cart cleared", "info");
                    }}
                  >
                    Clear Cart
                  </button>
                  <Link
                    to="/user-dashboard"
                    className="btn btn-link w-100 text-dark mt-2"
                  >
                    <i className="bi bi-arrow-left me-1"></i>Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Cart;
