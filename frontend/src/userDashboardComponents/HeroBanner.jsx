import { useNavigate } from "react-router-dom";

function HeroBanner() {
  const navigate = useNavigate();

  return (
    <header className="hero-banner">
      <div className="hero-overlay">
        <div className="container text-center">
          <h1 className="hero-title">New Season Arrivals</h1>
          <p className="hero-subtitle">
            Discover the latest trends in fashion. Quality meets affordability.
          </p>
          <button
            className="btn btn-light btn-lg hero-cta"
            onClick={() => navigate("/shop?category=All")}
          >
            Shop Now <i className="bi bi-arrow-right ms-2"></i>
          </button>
        </div>
      </div>
    </header>
  );
}

export default HeroBanner;
