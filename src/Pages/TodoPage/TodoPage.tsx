import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../Components/Actions/Input";
import Button from "../../Components/Button";
import SingleTodo from "./Components/SingleTodo";
import { ErrorType, TodoType } from "./TodoTypes";
import { RootState } from "../../store/store";
import { addTodo, changeValueHandler } from "../../store/slices/todoSlice";

const TodoPage = () => {
  const dispatch = useDispatch();
  const singleTodo = useSelector(
    (state: RootState) => state.todosSlice.singleTodo
  );
  const todoLists = useSelector(
    (state: RootState) => state.todosSlice.todoLists
  );
  console.log(todoLists);

  const [error, seterror] = useState<ErrorType>({
    state: false,
    msg: "",
  });

  const formDataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // settodo({ ...todo, [e.target.name]: e.target.value });
    dispatch(
      changeValueHandler({
        name: e.target.name,
        value: e.target.value.toString(),
      })
    );
  };

  const addTodoHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!singleTodo.id || !singleTodo.title || !singleTodo.desc) {
      seterror({
        state: true,
        msg: "Fill All Fields",
      });
      setTimeout(() => {
        seterror({ state: false, msg: "" });
      }, 1500);
    } else {
      dispatch(addTodo({ todo: singleTodo }));
      // settodoList([...todoList, todo]);
      // settodo({
      //   id: "",
      //   title: "",
      //   desc: "",
      // });
    }
  };

  return (
    <div>
      <h1>TODO LIST</h1>
      <form>
        <label>Number</label>
        <Input
          type="number"
          value={singleTodo.id}
          name="id"
          onChange={formDataHandler}
        />
        <label>Title</label>
        <Input
          type="text"
          value={singleTodo.title}
          name="title"
          onChange={formDataHandler}
        />
        <label>Desc</label>
        <Input
          type="text"
          value={singleTodo.desc}
          name="desc"
          onChange={formDataHandler}
        />
        <Button title="Create" type="submit" onClick={addTodoHandler} />
      </form>
      <div>
        {todoLists.map((el: TodoType, index) => (
          <SingleTodo el={el} key={`todo-${index}`} />
        ))}
      </div>
      {error.state && <p data-cy="create-error">{error.msg}</p>}
    </div>
  );
};

export default TodoPage;
