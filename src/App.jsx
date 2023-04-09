import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { deletePhoto, usePhotoSrc } from "./db";
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import MapboxMap from "./components/MapboxMap";
import Weather from "./components/Weather";
import HamburgerMenu from "./components/HamburgerMenu";

// Define filters for tasks
const FILTER_MAP = {
  All: () => true,
  Open: (task) => !task.completed,
  Closed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

// App function
function App(props) {
  // Geolocation functionality
  function geoFindMe() {
    // Geolocation success callback
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      locateTask(lastInsertedId, {
        latitude: latitude,
        longitude: longitude,
        error: "",
      });
    }

    // Geolocation error callback
    function locationError() {
      console.log("Unable to retrieve location!");
    }

    // Check for geolocation support in the browser
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating");
      navigator.geolocation.getCurrentPosition(success, locationError);
    }
  }

  // Update task location
  function locateTask(id, location) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, location };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // State for tasks, filter, and lastInsertedId
  const [tasks, setTasks] = useState(() => {
    const initialValue = localStorage.getItem("todo-items");

    return initialValue !== null ? JSON.parse(initialValue) : [];
  });

  const [filter, setFilter] = useState("All");
  const [lastInsertedId, setLastInsertedId] = useState("");

  // Update localStorage with tasks
  useEffect(() => {
    localStorage.setItem("todo-items", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  function addTask(name) {
    const id = "todo-" + nanoid();
    const newTask = {
      id: id,
      name,
      completed: false,
      location: {
        latitude: "",
        longitude: "",
        error: "",
      },
    };
    setLastInsertedId(id);
    setTasks([...tasks, newTask]);
  }

  // Toggle task completion status
  function toggleTaskCompleted(id, isOpen) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !isOpen };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // Delete a task
  function deleteTask(id) {
    const confirmed = window.confirm("Do you want to delete this task?");
    if (confirmed) {
      setTasks(tasks.filter((task) => id !== task.id));
      deletePhoto(id);
    }
  }

  // Edit a task
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

    // Update task with photo
    function photoedTask(id) {
      const photoedTaskList = tasks.map((task) => {
        if (id === task.id) {
          return { ...task, photo: true };
        }
        return task;
      });
      setTasks(photoedTaskList);
    }
  
    // Generate filtered task list
    const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
      <div
        className="task-box"
        key={task.id}
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <h3>{task.name}</h3>
        <Weather
          latitude={task.location.latitude}
          longitude={task.location.longitude}
        />
        <MapboxMap
          latitude={task.location.latitude}
          longitude={task.location.longitude}
        />
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
  
    // Generate filter button list
    const filterList = FILTER_NAMES.map((name) => (
      <FilterButton
        key={name}
        name={name}
        isPressed={name === filter}
        setFilter={setFilter}
      />
    ));
  
    // Generate heading text based on task count
    const tasksNoun = taskList.length !== 1 ? "slopes" : "slope";
    const headingText = `${taskList.length} ${tasksNoun} added`;
  
    // Render the application
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
  