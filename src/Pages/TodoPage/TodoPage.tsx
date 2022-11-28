import React, { useState } from "react";
import Button from "../../Components/Button";
import SingleTodo from "./Components/SingleTodo";
import { ErrorType, TodoType } from "./TodoTypes";

const TodoPage = () => {
  const [todo, settodo] = useState<TodoType>({
    id: "",
    title: "",
    desc: "",
  });
  const [error, seterror] = useState<ErrorType>({
    state: false,
    msg: "",
  });
  const [todoList, settodoList] = useState<TodoType[]>([]);

  const formDataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    settodo({ ...todo, [e.target.name]: e.target.value });
  };

  const addTodoHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!todo.id || !todo.title || !todo.desc) {
      seterror({
        state: true,
        msg: "Fill All Fields",
      });
      setTimeout(() => {
        seterror({ state: false, msg: "" });
      }, 1500);
    } else {
      settodoList([...todoList, todo]);
      settodo({
        id: "",
        title: "",
        desc: "",
      });
    }
  };

  return (
    <div>
      <h1>TODO LIST</h1>
      <form>
        <input
          type="number"
          value={todo.id}
          name="id"
          onChange={formDataHandler}
        />
        <input
          type="text"
          value={todo.title}
          name="title"
          onChange={formDataHandler}
        />
        <input
          type="text"
          value={todo.desc}
          name="desc"
          onChange={formDataHandler}
        />
        <Button title="Create" type="submit" onClick={addTodoHandler} />
      </form>
      <div>
        {todoList.map((el: TodoType, index) => (
          <SingleTodo el={el} key={`todo-${index}`} />
        ))}
      </div>
      {error.state && <p data-cy="create-error">{error.msg}</p>}
    </div>
  );
};

export default TodoPage;
