import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodosList } from "../../types";
import { findMaxId } from "../../utils/findMaxId";

export interface TodoListState {
  lists: TodosList[];
  maxId: number;
  loading: boolean;
}

const initialState: TodoListState = {
  lists: [],
  maxId: 0,
  loading: false,
};

const slice = createSlice({
  name: "todolists",
  initialState,
  reducers: {
    getListsFetch: (state) => {
      state.loading = true;
    },
    setLists: (state, action: PayloadAction<TodosList[]>) => {
      state.lists = action.payload;
      state.maxId = findMaxId(action.payload);
      state.loading = false;
    },
    addList: (state, action: PayloadAction<string>) => {
      const newId = findMaxId(state.lists) + 1;
      const list = {
        name: action.payload,
        id: newId,
      } as TodosList;

      state.lists.push(list);
      state.maxId = newId;
    },
    deleteList: (state, action: PayloadAction<number>) => {
      const index = state.lists.findIndex((list) => list.id == action.payload);

      state.lists = state.lists.splice(index, 1);
      state.maxId = findMaxId(state.lists);
    },
  },
});

export const { getListsFetch, setLists, addList, deleteList } = slice.actions;

export default slice.reducer;
