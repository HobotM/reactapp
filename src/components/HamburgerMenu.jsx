import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import "reactjs-popup/dist/index.css";
import { Link } from "react-router-dom";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`hamburger-menu${isOpen ? " open" : ""}`}>
      <button className="hamburger-button" onClick={toggleMenu}>
        <FiMenu size="1.5em" />
      </button>
      {isOpen && (
        <nav className="menu">
          <ul>
<<<<<<< HEAD
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/about" onClick={toggleMenu}>
              About
            </Link>
=======
            <li>
              <a href="/">Home</a>
            </li>
            {/* Add more menu items here */}
>>>>>>> parent of f3d3184 (about section)
          </ul>
        </nav>
      )}
    </div>
  );
};

export default HamburgerMenu;
