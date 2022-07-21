import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { undo } from "redux-undo-action";
import gsAxios from "../../api";
import { TodosList } from "../../types";
import { addList, deleteList, setLists } from "./todoListSlice";

function* workGetListsFetch() {
  try {
    const response: AxiosResponse<TodosList[]> = yield call(gsAxios.get<TodosList[]>, "/todoslist");
    yield put(setLists(response.data));
  } catch (error) {
    yield console.log(error);
  }
}

function* workAddList(action: PayloadAction<string>) {
  try {
    yield put(addList(action.payload));
    yield call(gsAxios.post<TodosList>, "/todoslist", action.payload);
  } catch(error) {
    yield console.log(error);
    yield put(undo(addList(action.payload)));
  }
}

function* workDeleteList(action: PayloadAction<number>) {
  try {
    yield put(deleteList(action.payload));
    yield call(gsAxios.post<TodosList>, `/todoslist/${action.payload}`);
  } catch(error) {
    yield console.log(error);
    yield undo(deleteList(action.payload));
  }
}

export default function* watchTodoListSaga() {
  yield takeLatest("todolists/getListsFetch", workGetListsFetch);
  yield takeLatest("todolists/addList", workAddList);
  yield takeLatest("todolists/DeleteList", workDeleteList);
}
