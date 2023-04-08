import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import "./index.css";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <button className="hamburger-button" onClick={toggleMenu}>
        <FiMenu size="1.5em" />
      </button>
      {isOpen && (
        <nav className="menu">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            {/* Add more menu items here */}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default HamburgerMenu;
