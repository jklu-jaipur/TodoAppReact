import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import {
  handleSignOut,
  addTodo,
  getUserID,
  deleteTodo,
  handleUpdateFinished,
  handleUpdateStart,
} from "../../utils/firebaseUtils";
import { firestore } from "../../utils/firebase";

function Todo() {
  // State to hold the new todo input.
  const [input, setInput] = useState("");
  // State to hold all the todos.
  const [todos, setTodos] = useState([]);

  // Constant to hold user id
  const uid = getUserID();

  useEffect(() => {
    getTodoData();
  });

  // Get todo data from firestore
  async function getTodoData() {
    const todoRef = await firestore()
      .collection("USERS")
      .doc(uid)
      .collection("TODO")
      .orderBy("createdAt", "desc")
      .get();
    // Temporary list to store data
    let TODO = [];
    todoRef.docs.map((doc) => {
      TODO.push(doc.data());
    });
    // Add all the todos to our todo state.
    setTodos(TODO);
  }

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
    // Add the todo to firestore
    addTodo(newTodo, uid);
    // Clear the input container
    setInput("");
  };

  // function to render the status of Todo.
  const renderStatus = (hasStarted, hasFinished, todoId) => {
    // If the user has finished the task
    if (hasFinished) {
      return <p>Finished</p>;
    }
    // if the user has started the task but not finshed yet
    else if (hasStarted && !hasFinished) {
      return (
        <div>
          <p>In Progress</p>
          <button onClick={() => handleUpdateFinished(todoId, uid)}>
            Finished
          </button>
        </div>
      );
    }
    // If the user has neither finshed the task nor started it.
    else {
      return (
        <div>
          <p>Not yet Started</p>
          <button onClick={() => handleUpdateStart(todoId, uid)}>Start</button>
        </div>
      );
    }
  };

  // Function to map the todos state to card component
  const mapTodos = () => {
    return todos.map((value, index) => (
      <Card
        todo={value}
        key={index}
        index={index}
        renderStatus={renderStatus(value.started, value.finished, value.todoId)}
        deleteTodo={() => deleteTodo(value.todoId, uid)}
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
      <button onClick={handleSignOut}>Sign Out</button>
      {mapTodos()}
    </div>
  );
}

export default Todo;
