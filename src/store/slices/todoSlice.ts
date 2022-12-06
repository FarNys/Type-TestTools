import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//ALL TYPE DEFINITION
type TodoType = {
  id: number;
  title: string;
  desc: string;
};

type initialType = {
  singleTodo: TodoType;
  todoLists: TodoType[];
};

type Result = {
  name: string | number;
  value: string | number;
};

const initialState: initialType = {
  singleTodo: {
    id: 0,
    title: "",
    desc: "",
  },
  todoLists: [],
};
// TYPE END

const todosSlice = createSlice({
  // A name, used in action types:
  name: "todos",
  // The initial state:
  initialState,
  // An object of "case reducers".
  // Key names will be used to generate actions:
  reducers: {
    changeValueHandler: (state: any, action: PayloadAction<Result>) => {
      state.singleTodo[action.payload.name] = action.payload.value;
    },
    addTodo: (state, action) => {
      state.todoLists.push(action.payload.todo);
      state.singleTodo = {
        id: 0,
        title: "",
        desc: "",
      };
    },
  },
});

export const { changeValueHandler, addTodo } = todosSlice.actions;
export default todosSlice.reducer;
