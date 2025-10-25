import "./bootstrap/css/styles.css";
import "../src/App.css"
import LogIn from "./logInComponents/login";
import AdminDashboard from "./adminDashboardComponents/adminDashboard";
import UserDashboard from "./userDashboardComponents/userDashboard";
import ProductDetail from "./userDashboardComponents/productDetails"; // new
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./userDashboardComponents/about";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login page */}
        <Route path="/" element={<LogIn />} />

        {/* Admin dashboard */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* User dashboard */}
        <Route path="/user-dashboard" element={<UserDashboard />} />

        {/* Product detail page */}
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Add product page */}
        <Route path="/add-product" element={<AdminDashboard />} />
        {/* Add about page */}
        <Route path="/about" element={<About />} />
        {/* Shop with category filter */}
        <Route path="/shop" element={<UserDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
