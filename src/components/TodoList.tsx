import {
  Box,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import gsAxios from "../api";
import { Todo, TodoFilter } from "../types";
import TodoItem from "./TodoItem";
import TodoItemForm from "./TodoItemForm";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>("");
  const [filter, setFilter] = useState<TodoFilter>("all");
  const { listId } = useParams<string>();

  useEffect(() => {
    fetchTodos(listId);
  }, []);

  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: TodoFilter
  ) => {
    setFilter(newFilter);
  };

  const fetchTodos = (listId: string | undefined) => {
    gsAxios.get<Todo[]>(`/todoslist/${listId}/todos`).then((response) => {
      console.log(response.data);
      setTodos(response.data);
    });
  };

  const handleDeleteItem = (parentId: number, itemId: number) => {
    gsAxios
      .delete<Todo>(`/todoslist/${parentId}/todos/${itemId}`)
      .then((response) => {
        console.log(response.data);
        fetchTodos(parentId.toString());
      });
  };

  const handleAddItem = (
    parentId: string | undefined,
    title: string,
    comment: string,
    deadline: Date
  ) => {
    gsAxios
      .post<Todo>(`/todoslist/${parentId}/todos`, {
        title,
        comment,
        deadline: deadline.toISOString(),
      })
      .then((response) => {
        console.log(response.data);
        fetchTodos(parentId);
      });
  };

  const handleCheckFinished = (parentId: number, itemId: number) => {
    const filteredItem = todos.filter((todo) => todo.id == itemId)[0];

    gsAxios
      .put<Todo>(`/todoslist/${parentId}/todos/${itemId}`, {
        ...filteredItem,
        finished: !filteredItem.finished,
      })
      .then((response) => {
        console.log(response.data);
        fetchTodos(parentId.toString());
      });
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
              return todo.finished
            } else if (filter === "unfinished") {
              return !todo.finished
            } else {
              return todo;
            }
          })
          .map((todo) => {
            return (
              <TodoItem
                data={todo}
                handleDeleteItem={handleDeleteItem}
                handleCheckFinished={handleCheckFinished}
                key={todo.id}
              />
            );
          })}
      </Stack>
      <TodoItemForm parentId={listId} handleAddItem={handleAddItem} />
    </Box>
  );
};

export default TodoList;
