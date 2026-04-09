import React from "react";
import "../features/offer-letter/styles/Navbar.css"

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="nav-left">
        <img
         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpFWU9q3tLqaeQFb7msaTeRzww-PdoAVAlCg&s"
          alt="Mirafra Logo"
          className="logo"
        />
      </div>

      <div className="nav-center">
        <h2>Automated Document Generator</h2>
      </div>

      <div className="nav-right"></div>
    </div>
  );
};

export default Navbar;