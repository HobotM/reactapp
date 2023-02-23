import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

//App function
function App(props) {

    //geolocation
    function geoFindMe() {
      
      function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
    
        // Get the city name from the OpenCage Geocoder API
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=49352c6399a04850b1d5a27833bd8fe8&language=en`)
          .then(response => response.json())
          .then(data => {
            const city = data.results[0].components.city;
            if (city) {
              console.log("city found");
            } else {
              console.log("city not found");
            }
            locateTask(lastInsertedId, {latitude: latitude, longitude: longitude, city: city, error: "", mapLink: ""});
          })
          .catch(error => {
            console.log("city not found");
          });
      
        }
    
      function error() {
        console.log("unable to retrive location!");
      }
    
      if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser");
      } else {
        console.log("locating");
        navigator.geolocation.getCurrentPosition(success, error);
      }
    }

  const [tasks, setTasks] = useState(() => {
    const initialValue = localStorage.getItem('todo-items')
    
    return initialValue !== null ? JSON.parse(initialValue) : []
  });

  const [filter, setFilter] = useState('All');
  const [lastInsertedId, setLastInsertedId] = useState("");

  useEffect(() => {
    localStorage.setItem('todo-items', JSON.stringify(tasks));
  },[tasks])

  function addTask(name) {
    const id = "todo-" + nanoid();
    const newTask = { id: id, name, completed: false, location: {latitude:"", longitude:"", error:"", city:"", mapLink: ""} };
    setLastInsertedId(id);
    setTasks([...tasks, newTask]);
  }    

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }  

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }  

  function locateTask(id, location) {
    const locatedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
        if (id === task.id) { return {...task, location: location}
      }
      return task;
    });
    setTasks(locatedTaskList);
  }  

  function photoedTask(id){
    const photoedTaskList = tasks.map(task =>{
      if(id === task.id){
        return{...task, photo: true}
      }
      return task;
    });
    setTasks(photoedTaskList);
  }

  const taskList = tasks
.filter(FILTER_MAP[filter])
.map((task) => (
  <Todo
    id={task.id}
    name={task.name}
    completed={task.completed}
    key={task.id}
    latitude={task.location.latitude}
    longitude={task.location.longitude}
    city={task.location.city}
    mapLink={`https://www.openstreetmap.org/#map=18/${task.location?.latitude ?? ''}/${task.location?.longitude ?? ''}`}
    toggleTaskCompleted={toggleTaskCompleted}
    photoedTask={photoedTask}
    deleteTask={deleteTask}
    editTask={editTask}
  />
));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));
  
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  //render
  return (
    <div className="todoapp stack-large">
      <h1>ParentPal</h1>
      <Form addTask={addTask} geoFindMe={geoFindMe} />
      <div className="filters btn-group stack-exception">
      {filterList}
      </div>
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

