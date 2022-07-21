import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../types";
import { findMaxId } from "../../utils/findMaxId";

interface TodoState {
  todos: Todo[];
  maxId: number;
  loading: boolean;
}

const initialState: TodoState = {
  todos: [],
  maxId: 0,
  loading: false,
};

const slice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    getTodosFetch: (state) => {
      state.loading = true;
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      state.maxId = findMaxId(state.todos);
      state.loading = false;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      const todo = action.payload;
      const newId = findMaxId(state.todos) + 1;

      todo.id = newId;
      state.todos.push(action.payload);
      state.maxId = newId;
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const index = state.todos.findIndex((todo) => todo.id == action.payload);

      state.todos = state.todos.splice(index, 1);
      state.maxId = findMaxId(state.todos);
    },
    changeFinished: (state, action: PayloadAction<number>) => {
      const index = state.todos.findIndex((todo) => todo.id == action.payload);

      state.todos[index].finished = !state.todos[index].finished;
    },
  },
});

export const { getTodosFetch, setTodos, addTodo, deleteTodo, changeFinished } =
  slice.actions;

export default slice.reducer;
