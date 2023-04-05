import React, { useState, useRef, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Webcam from "react-webcam";
import { addPhoto, GetPhotoSrc } from "../db.jsx";

const WebcamCapture = (props) => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [ImgId, setImgId] = React.useState(null);
  const [PhotoSave, setPhotoSave] = React.useState(false);
  const [facingMode, setFacingMode] = React.useState("environment");

  useEffect(() => {
    if (PhotoSave) {
      props.photoedTask(ImgId);
      setPhotoSave(false);
    }
  });

  const capture = React.useCallback(
    (id) => {
      const ImageSrc = webcamRef.current.getScreenshot();
      setImgSrc(ImageSrc);
    },
    [webcamRef, setImgSrc]
  );
  const SavePhoto = (id, imgSrc) => {
    addPhoto(id, imgSrc);
    setImgId(id);
    setPhotoSave(true);
  };
  const cancelPhoto = (id, imgSrc) => {};

  const toggleCamera = () => {
    setFacingMode((prevState) =>
      prevState === "environment" ? "user" : "environment"
    );
  };

  return (
    <>
      {!imgSrc && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          facingMode={facingMode}
        />
      )}
      {imgSrc && <img src={imgSrc} />}
      <div className="btn-group">
        {!imgSrc && (
          <button
            type="button"
            className="btn"
            onClick={() => capture(props.id)}
          >
            Capture Photo
          </button>
        )}
        {imgSrc && (
          <button
            type="button"
            className="btn"
            onClick={() => SavePhoto(props.id, imgSrc)}
          >
            Save Photo
          </button>
        )}
        {!imgSrc && (
          <button type="button" className="btn" onClick={toggleCamera}>
            Swap Camera
          </button>
        )}
        <button
          type="button"
          className="btn"
          onClick={() => cancelPhoto(props.id, imgSrc)}
        >
          Cancel
        </button>
      </div>
    </>
  );
};



const ViewPhoto = (props) => {
  const photoSrc = GetPhotoSrc(props.id);
  return (
    <>
      <div>
        <img src={photoSrc} alt={props.name} />
      </div>
    </>
  );
};

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  function handleChange(e) {
    setNewName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }
  function handleToggleDetails() {
    setIsExpanded(!isExpanded);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel<span className="visually-hidden">renaming {props.name}</span>
        </button>

        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
          from {props.city}| la {props.latitude}| lo {props.longitude}
        </label>
        <a href={props.mapLink}>Map</a>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <Popup
          trigger={
            <button type="button" className="btn">
              Selfie!
            </button>
          }
          modal
        >
          <div>
            <WebcamCapture id={props.id} photoedTask={props.photoedTask} />
          </div>
        </Popup>
        <Popup
          trigger={
            <button type="button" className="btn">
              View Photo
            </button>
          }
          modal
        >
          <div>
            <ViewPhoto id={props.id} alt={props.name} />
          </div>
        </Popup>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  return (
    <li className="todo" onClick={handleToggleDetails}>
      {isEditing ? (
        editingTemplate
      ) : isExpanded ? (
        viewTemplate
      ) : (
        <div className="c-cb">
          <input
            id={props.id}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)}
          />
          <label className="todo-label" htmlFor={props.id}>
            {props.name}
          </label>
        </div>
      )}
    </li>
  );
}
