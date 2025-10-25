import UserHeader from "./userHeader";

function About() {
  return (
    <>
      {/* Navbar */}
      <UserHeader />

      {/* Page content */}
      <div className="container mt-5">
        <h1>About MyShop</h1>
        <p>
          Welcome to MyShop, your number one source for all things fashion. We're dedicated to providing you the very best of clothing and accessories, with an emphasis on quality, customer service, and uniqueness.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our mission is to offer trendy and affordable fashion items that empower individuals to express their unique style. We believe that fashion is a form of self-expression and we strive to provide products that inspire confidence and creativity.          
        </p>

        <h2>Why Choose Us?</h2>
        <ul>
          <li><strong>Quality Products:</strong> We source our products from trusted suppliers to ensure you receive only the best.</li>
          <li><strong>Customer Satisfaction:</strong> Our customers are our top priority. We are committed to providing exceptional service and support.</li>
          <li><strong>Unique Selection:</strong> We curate a diverse range of products to cater to different tastes and styles.</li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          If you have any questions or comments, please don't hesitate to contact us at   
          <a href="mailto:company.email.com"> company.email.com</a>.
        </p>

        <p>
          Thank you for choosing MyShop. We look forward to serving you!
        </p>
      </div>
    </>
  );
}

export default About;
