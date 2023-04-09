import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import "reactjs-popup/dist/index.css";

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
          <button className="close-button" onClick={toggleMenu}>
            <FiX size="1.5em" />
          </button>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">About</a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default HamburgerMenu;
