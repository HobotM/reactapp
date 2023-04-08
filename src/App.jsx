import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import {deletePhoto, usePhotoSrc} from "./db";
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import MapboxMap from "./components/MapboxMap";
import Weather from "./components/Weather";
import HamburgerMenu from "./components/HamburgerMenu";


const FILTER_MAP = {
  All: () => true,
  Open: (task) => !task.completed,
  Closed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

//App function
function App(props) {
  //geolocation
  function geoFindMe() {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      locateTask(lastInsertedId, {
        latitude: latitude,
        longitude: longitude,
        error: ""
      });
    }
  
    function locationError() {
      console.log("Unable to retrieve location!");
    }
  
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating");
      navigator.geolocation.getCurrentPosition(success, locationError);
    }
  }

  function locateTask(id, location) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, location };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const [tasks, setTasks] = useState(() => {
    const initialValue = localStorage.getItem("todo-items");

    return initialValue !== null ? JSON.parse(initialValue) : [];
  });

  const [filter, setFilter] = useState("All");
  const [lastInsertedId, setLastInsertedId] = useState("");

  useEffect(() => {
    localStorage.setItem("todo-items", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(name) {
    const id = "todo-" + nanoid();
    const newTask = {
      id: id,
      name,
      completed: false,
      location: {
        latitude: "",
        longitude: "",
        error: ""
      },
    };
    setLastInsertedId(id);
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id, isOpen) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !isOpen };
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  
  


  function deleteTask(id) {
    const confirmed = window.confirm("Do you want to delete this task?");
    if (confirmed) {
      setTasks(tasks.filter((task) => id !== task.id ));
      deletePhoto(id);
      }
    }
  

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  
  function photoedTask(id) {
    const photoedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, photo: true };
      }
      return task;
    });
    setTasks(photoedTaskList);
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <div className="task-box" key={task.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      <h3>{task.name}</h3>
      <Weather latitude={task.location.latitude} longitude={task.location.longitude} />
      <MapboxMap latitude={task.location.latitude} longitude={task.location.longitude} />
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        latitude={task.location.latitude}
        longitude={task.location.longitude}
        temperature={task.location.temperature}
        toggleTaskCompleted={toggleTaskCompleted}
        photoedTask={photoedTask}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "slopes" : "slope";
  const headingText = `${taskList.length} ${tasksNoun} added`;

  //render
  return (
    <div className="todoapp stack-large">
      <HamburgerMenu />
      <h1>SlopeSnap</h1>
      <Form addTask={addTask} geoFindMe={geoFindMe} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
