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
      state.maxId = Number(findMaxId(action.payload));
      state.loading = false;
    },
    addListFetch: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    addList: (state, action: PayloadAction<string>) => {
      const newId = Number(findMaxId(state.lists)) + 1;
      const list = {
        name: action.payload,
        id: newId,
      } as TodosList;

      state.lists.push(list);
      state.maxId = newId;
      state.loading = false;
    },
    deleteListFetch: (state, action: PayloadAction<number>) => {
      state.loading = true;
    },
    deleteList: (state, action: PayloadAction<number>) => {
      const filtered = state.lists.filter((list) => list.id !== action.payload);

      state.lists = filtered;
      state.maxId = Number(findMaxId(filtered));
      state.loading = false;
    },
  },
});

export const {
  getListsFetch,
  setLists,
  addList,
  addListFetch,
  deleteList,
  deleteListFetch,
} = slice.actions;

export default slice.reducer;
