import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
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
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <button onClick={openAboutModal} className="menu-link">
                About
              </button>
            </li>
          </ul>
        </nav>
      )}
      <AboutModal isOpen={isAboutModalOpen} closeModal={closeAboutModal} />
    </div>
  );
};

export default HamburgerMenu;
