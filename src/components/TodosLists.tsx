import DeleteIcon from "@mui/icons-material/DeleteTwoTone";
import { Box, IconButton, Link } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  deleteListFetch,
  getListsFetch,
} from "../features/todolists/todoListSlice";
import { TodosList } from "../types";
import TodoListForm from "./TodoListForm";

const TodosLists = () => {
  const dispatch = useAppDispatch();
  const lists = useAppSelector((state) => state.todolists.lists) as TodosList[];

  useEffect(() => {
    dispatch(getListsFetch());
  }, [dispatch]);

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      m={2}
      pt={3}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        {lists.map((todoList) => {
          return (
            <Box key={todoList.id}>
              <Link href={`/${todoList.id}`} variant="h4">
                {todoList.name}
              </Link>
              <IconButton
                onClick={() => dispatch(deleteListFetch(todoList.id))}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          );
        })}
        <TodoListForm />
      </Box>
    </Box>
  );
};

export default TodosLists;
