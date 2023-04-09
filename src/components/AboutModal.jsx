// src/components/AboutModal.jsx

import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function AboutModal({ isOpen, closeModal }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="About Modal"
    >
      <h2>About SlopeSnap</h2>
      <p>
        SlopeSnap is an application that allows you to keep track of your
        favorite ski slopes. You can add slopes, delete them, and see their
        location on a map. Additionally, you can check the weather conditions
        for each slope and even take a picture.
      </p>
      <button onClick={closeModal}>Close</button>
    </Modal>
  );
}

export default AboutModal;
