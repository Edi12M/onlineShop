import UserHeader from "./userHeader";
import Footer from "../components/Footer";

function About() {
  const features = [
    {
      icon: "bi-gem",
      title: "Quality Products",
      description:
        "We source our products from trusted suppliers to ensure you receive only the best quality items.",
      color: "#e3f2fd",
      iconColor: "#1976d2",
    },
    {
      icon: "bi-heart",
      title: "Customer First",
      description:
        "Our customers are our top priority. We provide exceptional service and support at every step.",
      color: "#fce4ec",
      iconColor: "#c62828",
    },
    {
      icon: "bi-truck",
      title: "Fast Shipping",
      description:
        "We offer fast and reliable shipping so you can enjoy your new purchases as soon as possible.",
      color: "#e8f5e9",
      iconColor: "#388e3c",
    },
    {
      icon: "bi-shield-check",
      title: "Secure Shopping",
      description:
        "Shop with confidence knowing your transactions and personal data are fully protected.",
      color: "#fff3e0",
      iconColor: "#f57c00",
    },
  ];

  return (
    <>
      <UserHeader />

      <div className="about-hero">
        <div className="container">
          <h1 className="fw-bold">About MyShop</h1>
          <p className="mt-3">
            Your destination for quality fashion. We bring the latest trends
            with unbeatable prices and exceptional customer service.
          </p>
        </div>
      </div>

      <section className="py-5">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="section-title">Our Mission</h2>
              <p className="section-subtitle">
                We offer trendy and affordable fashion items that empower
                individuals to express their unique style. Fashion is a form of
                self-expression and we strive to provide products that inspire
                confidence and creativity.
              </p>
            </div>
          </div>

          <div className="row g-4 mb-5">
            {features.map((feature, index) => (
              <div className="col-lg-3 col-md-6" key={index}>
                <div className="feature-card">
                  <div
                    className="feature-icon"
                    style={{
                      background: feature.color,
                      color: feature.iconColor,
                    }}
                  >
                    <i
                      className={`bi ${feature.icon}`}
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </div>
                  <h5 className="fw-bold mt-3">{feature.title}</h5>
                  <p className="text-muted small">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="section-title">Get in Touch</h2>
              <p className="text-muted mb-4">
                Have questions? We'd love to hear from you. Reach out to our
                team.
              </p>
              <a
                href="mailto:support@myshop.com"
                className="btn btn-dark btn-lg px-5"
              >
                <i className="bi bi-envelope me-2"></i>Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;
