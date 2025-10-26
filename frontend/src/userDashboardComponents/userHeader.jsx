import Buttons from "../logInComponents/Buttons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function UserHeader() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setCartCount(2); // temporary cart count
  }, []);

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
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container px-4 px-lg-5">
        <a
          className="navbar-brand fw-bold fs-4"
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

            {/* Search input */}
            <input
              type="text"
              className="form-control ms-3"
              placeholder="Search products..."
              style={{ maxWidth: "200px" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />

            <Buttons
              className="cart-btn-custom ms-3"
              variant="outline-dark"
              onSelect={() => navigate("/cart")}
            >
              <i className="bi-cart-fill me-1"></i>
              Cart
              <span className="badge bg-dark text-white ms-1 rounded-pill">
                {cartCount}
              </span>
            </Buttons>
            <Buttons
          variant="btn btn-outline-primary"
          onSelect={() => {
            localStorage.removeItem("token");// remove JWT
            navigate("/"); // redirect to home/login
          }}
        >
          SignOut
        </Buttons>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default UserHeader;
