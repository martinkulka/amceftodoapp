import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, put, takeEvery, select } from "redux-saga/effects";
import { undo } from "redux-undo-action";
import gsAxios from "../../api";
import { Todo, TodoDeletePayload, TodoAddPayload, TodoChangeFinishedPayload } from "../../types";
import { setTodos, addTodo, deleteTodo, changeFinished } from "./todoSlice";

const addTodoAsync = ({ title, comment, deadline, todoslistId }: TodoAddPayload) => {
    return gsAxios.post<Todo>(`/todoslist/${todoslistId}/todos`, {title, comment, deadline})
}

const changeFinishedAsync = (todo: Todo) => {
    return gsAxios.put<Todo>(`/todoslist/${todo.todoslistId}/todos/${todo.id}`, todo)
}

function* workGetTodosFetch(action: PayloadAction<number>) {
    try {
        const response: AxiosResponse<Todo[]> = yield call(gsAxios.get<Todo[]>, `/todoslist/${action.payload}/todos`);
        yield put(setTodos(response.data));
    } catch(error) {
        yield console.log(error);
    }
}

function* workAddTodoFetch(action: PayloadAction<TodoAddPayload>) {
    try {
        yield put(addTodo(action.payload));
        yield call(addTodoAsync, action.payload);
    } catch(error) {
        console.log(error);
        yield undo(addTodo(action.payload));
    }
}

function* workDeleteTodoFetch(action: PayloadAction<TodoDeletePayload>) {
    const { id, todoslistId } = action.payload;

    try {
        yield put(deleteTodo(action.payload));
        yield call(gsAxios.delete<Todo>, `/todoslist/${todoslistId}/todos/${id}`);
    } catch(error) {
        console.log(error);
        yield undo(deleteTodo(action.payload));
    }
}

function* workChangeFinishedFetch(action: PayloadAction<TodoChangeFinishedPayload>) {
    const todos: Todo[] = yield select((state) => state.todos.todos);
    console.log(todos);
    const foundTodo = todos.find((todo) => todo.id === action.payload.id);
    const changedTodo = {
        ...foundTodo,
        finished: !foundTodo?.finished
    } as Todo;
    
    try {
        yield put(changeFinished(action.payload));
        yield call(changeFinishedAsync, changedTodo);
    } catch(error) {
        console.log(error);
        yield undo(changeFinished(action.payload));
    }
}

export default function* watchTodoSaga() {
    yield takeEvery("todos/getTodosFetch", workGetTodosFetch);
    yield takeEvery("todos/addTodoFetch", workAddTodoFetch);
    yield takeEvery("todos/deleteTodoFetch", workDeleteTodoFetch);
    yield takeEvery("todos/changeFinishedFetch", workChangeFinishedFetch);
}


