import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {

// URL VARIABLE
const url = "https://zanedogsbackend.herokuapp.com";
// LIST OF DOGS STATE
const [dogs, setDogs] = React.useState([]);
//empty dog for form
const emptyDog = {
  name: '',
  age: 0,
  img: ''
}
//selected dog state
const [selectedDog, setSelectedDog] = React.useState(emptyDog)
// GET LIST OF DOGS FUNCTION
const getDogs = () => {
  fetch(url + "/dog/")
    .then((response) => response.json())
    .then((data) => {
      setDogs(data);
    });
};
//handle create for dogs
const handleCreate = (newDog) => {
  fetch(url + '/dog/', {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newDog)
  })
  .then(response => getDogs())
}

const handleUpdate = (dog) => {
  fetch(url + '/dog/' + dog._id, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dog)
  }).then(() => {
    getDogs()
  })
}

const handleDelete = (dog) => {
fetch(url + '/dog/' + dog._id, {
  method: 'delete'
}).then(() => {
  getDogs()
})
}

const selectDog = (dog) => {
  setSelectedDog(dog)
}
//useEffect to do initial fetch of dogs
React.useEffect(() => getDogs(), []);

  return (
    <div className="App">
      <h1>DOG LISTING SITE</h1>
      <Link to='/create'><button>Add Dog</button></Link>
      <hr />
      <main>
        <Switch>
          <Route exact path="/" render={(rp) => <Display {...rp} dogs={dogs} selectDog={selectDog} deleteDog={handleDelete}/>} />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" dog={emptyDog} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" dog={{}} handleSubmit={handleUpdate} dog={selectedDog} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
