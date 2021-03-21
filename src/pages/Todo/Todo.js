import React, { useState } from "react";
import Card from "../../components/Card/Card";

function Todo() {
  // State to hold the new todo input.
  const [input, setInput] = useState("");
  // State to hold all the todos.
  const [todos, setTodos] = useState([]);

  // Function to handle input submit
  const handleSubmit = (e) => {
    // prevent the page from reloading
    e.preventDefault();
    // New todo object
    const newTodo = {
      todo: input,
      started: false,
      finished: false,
    };
    // Store or log the new todo
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    // Clear the input container
    setInput("");
  };
  console.log(todos);

  // Update Start Status
  const handleUpdateStart = (index) => {
    // Copy the existing Todos list in a new variable
    let updatedTodos = [...todos];
    // Update the started value
    updatedTodos[index].started = true;
    setTodos(updatedTodos);
  };

  // Update Finished Status
  const handleUpdateFinished = (index) => {
    // Copy the todos list in a new variable
    let updatedTodos = [...todos];
    // Update the finished value in the todo
    updatedTodos[index].finished = true;
    setTodos(updatedTodos);
  };

  // function to render the status of Todo.
  const renderStatus = (hasStarted, hasFinished, index) => {
    // If the user has finished the task
    if (hasFinished) {
      return <p>Finished</p>;
    }
    // if the user has started the task but not finshed yet
    else if (hasStarted && !hasFinished) {
      return (
        <div>
          <p>In Progress</p>
          <button onClick={() => handleUpdateFinished(index)}>Finished</button>
        </div>
      );
    }
    // If the user has neither finshed the task nor started it.
    else {
      return (
        <div>
          <p>Not yet Started</p>
          <button onClick={() => handleUpdateStart(index)}>Start</button>
        </div>
      );
    }
  };

  // function to delete todos
  const deleteTodo = (index) => {
    // Copy the existing todos list into a temporary variable
    const tempTodos = [...todos];
    // Remove the todo
    tempTodos.splice(index, 1);
    // Set the new todo list
    setTodos(tempTodos);
  };

  // Function to map the todos state to card component
  const mapTodos = () => {
    return todos.map((value, index) => (
      <Card
        todo={value}
        key={index}
        index={index}
        renderStatus={renderStatus(value.started, value.finished, index)}
        deleteTodo={() => deleteTodo(index)}
      />
    ));
  };

  return (
    <div>
      <h1>Todos</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter Todo here"
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <input type="submit" value="Post" />
      </form>
      {mapTodos()}
    </div>
  );
}

export default Todo;
