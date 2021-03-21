// Functional component to display individual ToDos.
import React from "react";
import "./Card.css";

function Card({ todo, renderStatus, deleteTodo }) {
  return (
    <div className="todoCard">
      <h4>{todo.todo}</h4>
      {renderStatus}
      <button onClick={deleteTodo}>Delete</button>
    </div>
  );
}

export default Card;
