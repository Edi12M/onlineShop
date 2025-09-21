import "./App.css";
import LogIn from "./logInComponents/login";
import AdminDashboard from "./adminDashboardComponents/adminDashboard";
import UserDashboard from "./userDashboardComponents/userDashboard";
import ProductDetail from "./userDashboardComponents/productDetails"; // new
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <Router>
        <div className="mainDiv">
          <Routes>
            {/* Login page */}
            <Route path="/" element={<LogIn />} />

            {/* Admin dashboard */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

            {/* User dashboard */}
            <Route path="/user-dashboard" element={<UserDashboard />} />

            {/* Product detail page */}
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
