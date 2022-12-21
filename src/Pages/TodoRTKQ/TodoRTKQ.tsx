import React, { useId } from "react";
// import { useGetTodosQuery } from "../../store/api/apiSlice";
import {
  useAddTodoRtkMutation,
  useDeleteTodoRtkMutation,
  useGetTodoRtkQuery,
  useUpdateTodoRtkMutation,
} from "../../store/api/todoApi";
import Button from "../../Components/Actions/Button";

const TodoRTKQ = () => {
  const id = useId();
  const { data, error, isLoading } = useGetTodoRtkQuery("");
  console.log(isLoading, data);
  const [addTodoRtk] = useAddTodoRtkMutation();
  const [deleteTodoRtk] = useDeleteTodoRtkMutation();
  const [updateTodoRtk] = useUpdateTodoRtkMutation();
  const createTodoHandler = () => {
    addTodoRtk({
      userId: 1,
      id: Math.random(),
      title: `LLXXMM 9988 22 =--33 ${id}-${Math.random()}`,
      completed: false,
    });
  };

  const deleteTodoHandler = () => {
    deleteTodoRtk(9);
  };

  const UpdateTodoHandler = () => {
    updateTodoRtk({
      id: 11,
      newItem: {
        userId: 1,
        id: Math.random(),
        title: `I AM UPDATED again ${id}-${Math.random()}`,
        completed: false,
      },
    });
  };

  return (
    <div>
      <div>
        {data &&
          data.map((el: any, index: number) => (
            <p key={`todo-rtk-${index}`}>
              {el.id}--{el.title}
            </p>
          ))}
      </div>
      <div>
        <Button
          size="md"
          variant="info"
          title="Create"
          onClick={createTodoHandler}
        />
        <Button
          size="md"
          title="Delete"
          variant="danger"
          onClick={deleteTodoHandler}
        />
        <Button
          size="md"
          title="Update"
          variant="success"
          onClick={UpdateTodoHandler}
        />
      </div>
    </div>
  );
};

export default TodoRTKQ;
