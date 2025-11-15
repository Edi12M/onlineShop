function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <h5 className="footer-heading">MyShop</h5>
            <p className="footer-text">
              Your destination for quality fashion. We bring you the latest
              trends with unbeatable prices and exceptional customer service.
            </p>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="footer-heading">Shop</h6>
            <ul className="footer-links">
              <li>
                <a href="/shop?category=Men">Men</a>
              </li>
              <li>
                <a href="/shop?category=Women">Women</a>
              </li>
              <li>
                <a href="/shop?category=Kids">Kids</a>
              </li>
              <li>
                <a href="/shop?category=Accessories">Accessories</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="footer-heading">Company</h6>
            <ul className="footer-links">
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/about">Contact</a>
              </li>
              <li>
                <a href="/about">Careers</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6">
            <h6 className="footer-heading">Stay Connected</h6>
            <p className="footer-text">
              Subscribe for exclusive offers and updates.
            </p>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Your email address"
              />
              <button className="btn btn-light" type="button">
                <i className="bi bi-send"></i>
              </button>
            </div>
            <div className="social-icons">
              <a href="#">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#">
                <i className="bi bi-pinterest"></i>
              </a>
            </div>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="text-center">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} MyShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
