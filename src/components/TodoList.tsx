import { Box, Divider, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import gsAxios from "../api";
import { Todo } from "../types";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { listId } = useParams<string>();

  useEffect(() => {
    fetchTodos(listId);
  }, []);

  const fetchTodos = (listId: string | undefined) => {
    gsAxios.get<Todo[]>(`/todoslist/${listId}/todos`).then((response) => {
      console.log(response.data);
      setTodos(response.data);
    });
  };

  return (
    <Box height="100vh" display="flex" flexDirection="column" m={2} pt={3}>
      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        divider={<Divider orientation="horizontal" flexItem />}
      >
        {todos.map((todo) => {
          return <TodoItem data={todo} key={todo.id} />;
        })}
      </Stack>
    </Box>
  );
};

export default TodoList;
