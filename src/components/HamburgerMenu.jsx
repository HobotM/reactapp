import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const AboutPopup = ({ onClose, onMenuClose }) => (
  <Popup
    contentStyle={{ zIndex: 9999, overflowY: 'auto', width:"90vw" }}
    overlayStyle={{ zIndex: 9999 }}
    trigger={<a href="#" onClick={onMenuClose}>About</a>}
    modal
    closeOnDocumentClick
    onClose={onClose}
  >
    {close => (
      <div className="about-popup" style={{ overflowY: "scroll" }} >
        <button className="close" onClick={close}>
          <FiX size="1.5em" />
        </button>
        <h2>About SlopeSnap</h2>
        <p>
          With SlopeSnap, users can save the location of the slope in Scotland they are currently on.
        </p>
        <p>
          Key features of SlopeSnap include task management, geolocation, weather information, interactive map, and responsive design. SlopeSnap is the perfect companion for those who love skiing and snowboarding.
        </p>
        <ol>
          <li>Launch SlopeSnap by opening the URL in your web browser.</li>
          <li>Select a slope from the list and click "Add"</li>
          <li>View your task in the list of tasks.</li>
          <li>You will be able to see geolocation - longitude and latitude, and map with the pin</li>
          <li>To edit a task, click on the "Edit" button and update the name or location.</li>
          <li>To capture the picture, click "Capture" and then swap the camera if needed.</li>
          <li>To view a captured photo for the entry, click on the "View Photo" button, capture a new photo to override the current one if needed.</li>
          <li>To delete a task, click on the "Delete" button, and confirm.</li>
          <li>To mark a slope as opened or closed , click on the radio button next to "Closed" or "Open".</li>
        </ol>
      </div>
    )}
  </Popup>
);



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
            <AboutPopup onClose={toggleMenu} onMenuClose={toggleMenu} />

            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default HamburgerMenu;
