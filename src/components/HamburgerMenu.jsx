import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const AboutPopup = () => (
    <Popup
      trigger={<a href="#">About</a>}
      modal
      closeOnDocumentClick
    >
      {(close) => (
        <div className="about-popup">
          <button className="close" onClick={close}>
            <FiX size="1.5em" />
          </button>
          <h2>About SlopeSnap</h2>
          <p>
            SlopeSnap is a convenient and user-friendly app designed for outdoor enthusiasts who love exploring slopes and mountainous terrains. The app allows users to create and manage tasks related to their adventures, plan their trips effectively, and record their experiences. With SlopeSnap, users can view real-time weather information and visualize their location on an interactive map, ensuring they are well-informed and prepared for their journey.
          </p>
          <p>
            Key features of SlopeSnap include task management, geolocation, weather information, interactive map, and responsive design. SlopeSnap is the perfect companion for those who love exploring the great outdoors and want an organized, informative, and engaging tool to enhance their slope adventures.
          </p>
        </div>
      )}
    </Popup>
  );

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
              <AboutPopup />
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default HamburgerMenu;
