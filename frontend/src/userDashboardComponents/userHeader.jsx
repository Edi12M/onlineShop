import Buttons from "../logInComponents/Buttons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function UserHeader() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    { label: "Home", path: "/user-dashboard" },
    { label: "Men", path: "/shop?category=Men" },
    { label: "Women", path: "/shop?category=Women" },
    { label: "Kids", path: "/shop?category=Kids" },
    { label: "About", path: "/about" },
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    navigate(`/shop?${params.toString()}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container px-4 px-lg-5">
        <a
          className="navbar-brand fw-bold fs-4"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/user-dashboard")}
        >
          MyShop
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="ms-auto d-flex align-items-center gap-2">
            {navItems.map((item) => (
              <Buttons
                variant="light"
                key={item.label}
                className="nav-btn-custom"
                onSelect={() => navigate(item.path)}
              >
                {item.label}
              </Buttons>
            ))}

            <div className="input-group ms-3" style={{ maxWidth: "220px" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
              />
              <button className="btn btn-outline-dark" onClick={handleSearch}>
                <i className="bi bi-search"></i>
              </button>
            </div>

            <Buttons
              className="cart-btn-custom ms-2"
              variant="outline-dark"
              onSelect={() => navigate("/cart")}
            >
              <i className="bi-cart-fill me-1"></i>
              Cart
              {cartCount > 0 && (
                <span className="badge bg-dark text-white ms-1 rounded-pill">
                  {cartCount}
                </span>
              )}
            </Buttons>

            <Buttons
              variant="outline-danger"
              className="ms-2"
              onSelect={() => {
                logout();
                navigate("/");
              }}
            >
              <i className="bi bi-box-arrow-right me-1"></i>Sign Out
            </Buttons>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default UserHeader;
