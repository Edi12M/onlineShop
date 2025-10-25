import backgroundLogo from "../assets/background.jpg";
import LoginForm from "./form";

function LogIn() {
  return (
    <div
      className="login-page d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${backgroundLogo})`,
        backgroundSize: "cover",       // stretch to fill viewport
        backgroundPosition: "center",  // center image
        backgroundRepeat: "no-repeat", // no repeat
        width: "100%",                  // full width
        height: "100%",                 // full height
        minHeight: "100vh",             // fallback for some browsers
      }}
    >
      <LoginForm />
    </div>
  );
}

export default LogIn;
