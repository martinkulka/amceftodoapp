import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Todo,
  TodoAddPayload,
  TodoChangeFinishedPayload,
  TodoDeletePayload,
} from "../../types";
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
    getTodosFetch: (state, _action) => {
      state.loading = true;
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      state.maxId = Number(findMaxId(state.todos));
      state.loading = false;
    },
    addTodoFetch: (state, action: PayloadAction<TodoAddPayload>) => {
      state.loading = true;
    },
    addTodo: (state, action: PayloadAction<TodoAddPayload>) => {
      const newId = Number(findMaxId(state.todos)) + 1;
      const todo = {
        title: action.payload.title,
        comment: action.payload.comment,
        deadline: action.payload.deadline,
        finished: false,
        id: newId,
        todoslistId: action.payload.todoslistId,
      } as Todo;

      state.todos.push(todo);
      state.maxId = newId;
      state.loading = false;
    },
    deleteTodoFetch: (state, action: PayloadAction<TodoDeletePayload>) => {
      state.loading = true;
    },
    deleteTodo: (state, action: PayloadAction<TodoDeletePayload>) => {
      const filtered = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );

      state.todos = filtered;
      state.maxId = Number(findMaxId(state.todos));
      state.loading = false;
    },
    changeFinishedFetch: (
      state,
      action: PayloadAction<TodoChangeFinishedPayload>
    ) => {
      state.loading = true;
    },
    changeFinished: (
      state,
      action: PayloadAction<TodoChangeFinishedPayload>
    ) => {
      const changedTodosState = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            finished: !todo.finished,
          };
        }

        return todo;
      });
      state.todos = changedTodosState;
      state.loading = false;
    },
  },
});

export const {
  getTodosFetch,
  setTodos,
  addTodo,
  addTodoFetch,
  deleteTodo,
  deleteTodoFetch,
  changeFinished,
  changeFinishedFetch,
} = slice.actions;

export default slice.reducer;
