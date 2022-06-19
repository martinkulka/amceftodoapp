import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import gsAxios from "../api";
import { Todo } from "../types";
import TodoItem from "./TodoItem";
import TodoItemForm from "./TodoItemForm";

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
    gsAxios.post<Todo>(`/todoslist/${parentId}/todos`, {
      title,
      comment,
      deadline: deadline.toISOString(),
    }).then((response) => {
      console.log(response.data);
      fetchTodos(parentId);
    })
  };

  return (
    <Box height="100vh" display="flex" flexDirection="column" m={2} pt={3}>
      <Stack spacing={1} justifyContent="center" alignItems="center">
        {todos.map((todo) => {
          return (
            <TodoItem
              data={todo}
              handleDeleteItem={handleDeleteItem}
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
