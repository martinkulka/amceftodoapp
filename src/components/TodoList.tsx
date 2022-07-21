import {
  Box,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getTodosFetch } from "../features/todos/todoSlice";
import { Todo, TodoFilter } from "../types";
import TodoItem from "./TodoItem";
import TodoItemForm from "./TodoItemForm";

const TodoList = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos) as Todo[];
  const [query, setQuery] = useState<string>("");
  const [filter, setFilter] = useState<TodoFilter>("all");
  const { listId } = useParams<string>();

  useEffect(() => {
    dispatch(getTodosFetch(listId));
  }, [dispatch]);

  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: TodoFilter
  ) => {
    setFilter(newFilter);
  };

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      m={2}
      p={3}
    >
      {todos.length !== 0 && (
        <ToggleButtonGroup
          color="primary"
          value={filter}
          exclusive
          onChange={handleFilterChange}
          sx={{ paddingBottom: "4vh" }}
        >
          <ToggleButton value="all">ALL</ToggleButton>
          <ToggleButton value="finished">FINISHED</ToggleButton>
          <ToggleButton value="unfinished">UNFINISHED</ToggleButton>
        </ToggleButtonGroup>
      )}
      {todos.length !== 0 && (
        <TextField
          label="Search Todos"
          variant="filled"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          sx={{ paddingBottom: "4vh", width: "50vw" }}
        />
      )}
      <Stack spacing={1} justifyContent="center" alignItems="center">
        {todos
          .filter((todo) =>
            todo.title.toLowerCase().includes(query.toLowerCase())
          )
          .filter((todo) => {
            if (filter === "finished") {
              return todo.finished;
            } else if (filter === "unfinished") {
              return !todo.finished;
            } else {
              return todo;
            }
          })
          .map((todo) => {
            return <TodoItem data={todo} key={todo.id} />;
          })}
      </Stack>
      <TodoItemForm parentId={listId} />
    </Box>
  );
};

export default TodoList;
