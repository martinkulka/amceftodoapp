import { configureStore } from "@reduxjs/toolkit";
import todoListsReducer from "../features/todolists/todoListSlice";
import todoReducer from "../features/todos/todoSlice";
import { undoable } from "redux-undo-action";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import watchTodoListSaga from "../features/todolists/todoListSaga";

function* rootSaga() {
  yield all([
    watchTodoListSaga(),
  ])
}

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    todolists: undoable(todoListsReducer),
    todos: undoable(todoReducer),
  },
  middleware: [saga],
});

saga.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
