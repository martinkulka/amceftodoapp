import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { undo } from "redux-undo-action";
import gsAxios from "../../api";
import { TodosList } from "../../types";
import { addList, deleteList, setLists } from "./todoListSlice";

const addListAsync = (payload: string) => {
  return gsAxios.post("/todoslist", {name: payload});
}

function* workGetListsFetch() {
  try {
    const response: AxiosResponse<TodosList[]> = yield call(gsAxios.get<TodosList[]>, "/todoslist");
    yield put(setLists(response.data));
  } catch (error) {
    yield console.log(error);
  }
}

function* workAddListFetch(action: PayloadAction<string>) {
  try {
    yield put(addList(action.payload));
    yield call(addListAsync, action.payload);
  } catch(error) {
    yield console.log(error);
    yield put(undo(addList(action.payload)));
  }
}

function* workDeleteListFetch(action: PayloadAction<number>) {
  try {
    yield put(deleteList(action.payload));
    yield call(gsAxios.delete<TodosList>, `/todoslist/${action.payload}`);
  } catch(error) {
    yield console.log(error);
    yield undo(deleteList(action.payload));
  }
}

export default function* watchTodoListSaga() {
  yield takeEvery("todolists/getListsFetch", workGetListsFetch);
  yield takeEvery("todolists/addListFetch", workAddListFetch);
  yield takeEvery("todolists/deleteListFetch", workDeleteListFetch);
}
