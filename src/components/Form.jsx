import React, { useEffect, useState } from "react";

const slopesInScotland = [
  "Glenshee",
  "CairnGorm Mountain",
  "The Lecht",
  "Glencoe Mountain",
  "Nevis Range",
  "Other",
];

function Form(props) {
  const [addition, setAddition] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (addition) {
      props.geoFindMe();
      setAddition(false);
    }
  });

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setAddition(true);
    props.addTask(name);
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What are the slope conditions?
        </label>
      </h2>
      <label htmlFor="slope">
        Choose a slope:
        <select id="slope" name="slope" value={name} onChange={handleChange} required>
          <option value="">--Select a slope--</option>
          {slopesInScotland.map((slope) => (
            <option key={slope} value={slope}>
              {slope}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
