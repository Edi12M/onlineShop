import backgroundLogo from "../assets/background.jpg";
import LoginForm from "./form";


function LogIn() {
  return (
    <div
      className="Logo"
      style={{ backgroundImage: `url(${backgroundLogo})` }}
    >
      <LoginForm />
    </div>
  );
}

export default LogIn;
