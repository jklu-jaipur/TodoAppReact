import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import {
  addTodos,
  getUserId,
  signOut,
  deleteTodo,
  updateFinished,
  updateStarted,
} from "../../utils/firebaseUtils";
import { firestore } from "../../utils/firebase";

function Todo() {
  // State to hold the new todo input.
  const [input, setInput] = useState("");
  // State to hold all the todos.
  const [todos, setTodos] = useState([]);

  // Get user id
  const userId = getUserId();

  // Effect hook to get todos
  useEffect(() => {
    getTodos();
  }, []);

  // Get todos
  async function getTodos() {
    const todoDocRef = await firestore()
      .collection("USERS")
      .doc(userId)
      .collection("TODOS")
      .orderBy("timeStamp", "desc")
      .get();
    let todos = [];
    todoDocRef.docs.map((doc) => {
      todos.push(doc.data());
    });
    setTodos(todos);
  }

  // Function to handle input submit
  const handleSubmit = (e) => {
    // prevent the page from reloading
    e.preventDefault();
    if (input) {
      // New todo object
      const newTodo = {
        todo: input,
        started: false,
        finished: false,
      };
      // Add todo to firebase
      addTodos(newTodo, userId);
      // Clear the input container
      setInput("");
    } else {
      alert("Cannot create an Empty todo.");
    }
  };

  // Function to render the status of Todo.
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
          <button onClick={() => updateFinished(index, userId)}>
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
          <button onClick={() => updateStarted(index, userId)}>Start</button>
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
        deleteTodo={() => deleteTodo(value.todoId, userId)}
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
      <button onClick={signOut}>Sign Out</button>
      {mapTodos()}
    </div>
  );
}

export default Todo;
