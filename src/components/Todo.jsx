import React, { useState, useRef, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Webcam from "react-webcam";
import { addPhoto, GetPhotoSrc, deletePhoto } from "../db.jsx";

const WebcamCapture = (props) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [facingMode, setFacingMode] = useState("user");
  const webcamRef = React.useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  };

  const savePhoto = async () => {
    if (imgSrc) {
      // Remove the previous image, if there is any
      await deletePhoto(props.id);
      // Add the new photo
      await addPhoto(props.id, imgSrc);
      props.photoedTask(props.id);
      props.close();
    }
  };

  const swapCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  return (
    <div>
      {!imgSrc && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: facingMode }}
          className="webcam-preview"
        />
      )}
      {imgSrc && <img src={imgSrc} />}
      <div className="btn-group">
        {!imgSrc && (
          <button type="button" className="btn" onClick={capture}>
            Capture Photo
          </button>
        )}
        {imgSrc && (
          <button type="button" className="btn" onClick={savePhoto}>
            Save Photo
          </button>
        )}
        {!imgSrc && (
          <button type="button" className="btn" onClick={swapCamera}>
            Swap Camera
          </button>
        )}
      </div>
    </div>
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
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    async function fetchImage() {
      const image = await GetPhotoSrc(props.id);
      setImgSrc(image);
    }
    fetchImage();
  }, [props.id]);

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
          {props.name} from {props.city} | la {props.latitude} | lo{" "}
          {props.longitude}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <Popup
          trigger={
            <button type="button" className="btn">
              Capture
            </button>
          }
          modal
        >
          {(close) => (
            <div>
              <WebcamCapture
                id={props.id}
                photoedTask={props.photoedTask}
                close={close}
              />
            </div>
          )}
        </Popup>
        {imgSrc && (
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
        )}
       
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
