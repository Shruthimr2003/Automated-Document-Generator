// import React, { useState } from "react";
// import { useAuth } from "../hooks/useAuth";
// import { useNavigate } from "react-router-dom";
// import "../styles/LoginPage.css";

// import { Eye, EyeOff } from "lucide-react";   

// const LoginForm: React.FC = () => {
//   const { login, loading } = useAuth();
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const [error, setError] = useState("");

//   const isFormValid = username.trim() !== "" && password.trim() !== "";

//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");

//     if (!isFormValid) {
//       setError("Please enter username and password");
//       return;
//     }

//     try {
//       await login(username, password);
//       navigate("/");
//     } catch (err: any) {
//       setError(
//         err?.response?.data?.detail ||
//           err?.message ||
//           "Invalid username or password"
//       );
//     }
//   };

//   return (
//     <form className="login-card" onSubmit={handleLogin}>
//       <h2 className="login-title">Login</h2>

//       <input
//         className="login-input"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />

//       <div className="password-wrapper">
//         <input
//           className="login-input password-input"
//           placeholder="Password"
//           type={showPassword ? "text" : "password"}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         {error && <p className="login-error">{error}</p>}
//         <button
//           type="button"
//           className="eye-btn"
//           onClick={() => setShowPassword((prev) => !prev)}
//         >
//           {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//         </button>
//       </div>

//       <button
//         className="login-btn"
//         type="submit"
//         disabled={loading || !isFormValid}
//       >
//         {loading ? <div className="loader"></div> : "Login"}
//       </button>

//     </form>
//   );
// };

// export default LoginForm;

import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

import { Eye, EyeOff } from "lucide-react";

const LoginForm: React.FC = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!isFormValid) {
      setError("Please enter username and password");
      return;
    }

    try {
      await login(username, password);
      navigate("/");
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
        err?.message ||
        "Invalid username or password"
      );
    }
  };

  return (
    <div className="login-page">
      {/* LEFT IMAGE SECTION */}
      <div className="login-left">
        <img
          src="/login-image2.avif"
          alt="Login"
          className="login-image"
        />
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="login-right">
        <form className="login-card" onSubmit={handleLogin}>
          <h2 className="login-title">Login</h2>

          <input
            className="login-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="password-wrapper">
            <input
              className="login-input password-input"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Show eye icon only if password has text */}
            {password.trim() !== "" && (
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            )}
          </div>
          {error && <p className="login-error">{error}</p>}

          <button
            className="login-btn"
            type="submit"
            disabled={loading || !isFormValid}
          >
            {loading ? <div className="loader"></div> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;