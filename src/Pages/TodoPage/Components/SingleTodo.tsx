import React from "react";
import { TodoType } from "../TodoTypes";

interface Props {
  el: TodoType;
}

const SingleTodo: React.FC<Props> = ({ el }) => {
  return (
    <div style={{ marginBottom: "1rem" }} data-cy="single-todo">
      <h4>{el.title}</h4>
      <p>{el.desc}</p>
    </div>
  );
};

export default SingleTodo;
