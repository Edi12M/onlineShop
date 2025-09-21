import "./App.css";
import LogIn from "./logInComponents/login";
import AdminDashboard from "./adminDashboardComponents/adminDashboard";
import UserDashboard from "./adminDashboardComponents/userDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="mainDiv">
        <Routes>
          {/* Login page */}
          <Route path="/" element={<LogIn />} />

          {/* Admin dashboard */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          {/* User dashboard */}
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
