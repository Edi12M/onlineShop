import backgroundLogo from "../assets/background.jpg";
import LoginForm from "./form";

function LogIn() {
  return (
    <div
      className="login-page d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${backgroundLogo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <div className="login-container">
        <div className="login-brand-panel">
          <div>
            <h1 className="login-brand-title">MyShop</h1>
            <p className="login-brand-tagline">
              Discover curated fashion that defines your style.
            </p>
            <div className="login-brand-features">
              <div className="login-brand-feature">
                <i className="bi bi-truck"></i>
                <span>Free delivery on orders over $50</span>
              </div>
              <div className="login-brand-feature">
                <i className="bi bi-shield-check"></i>
                <span>100% secure checkout</span>
              </div>
              <div className="login-brand-feature">
                <i className="bi bi-arrow-repeat"></i>
                <span>Easy 30-day returns</span>
              </div>
            </div>
          </div>
        </div>

        <div className="login-form-panel">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LogIn;
