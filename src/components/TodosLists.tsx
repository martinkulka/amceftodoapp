import DeleteIcon from "@mui/icons-material/DeleteTwoTone";
import { Box, IconButton, Link } from "@mui/material";
import { useEffect, useState } from "react";
import gsAxios from "../api";
import { TodosList } from "../types";
import TodoListForm from "./TodoListForm";

const TodosLists = () => {
  const [lists, setLists] = useState<TodosList[]>([]);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = () => {
    gsAxios.get<TodosList[]>("/todoslist").then((response) => {
      console.log(response.data);
      setLists(response.data);
    });
  };

  const handleCreateList = (name: string) => {
    gsAxios
      .post<TodosList>("/todoslist", {
        name,
      })
      .then((response) => {
        console.log(response.data);
        fetchLists();
      });
  };

  const handleDeleteList = (id: number) => {
    gsAxios.delete<TodosList>(`/todoslist/${id}`).then((response) => {
      console.log(response.data);
      fetchLists();
    });
  };

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
              <IconButton onClick={() => handleDeleteList(todoList.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          );
        })}
        <TodoListForm handleCreateList={handleCreateList} />
      </Box>
    </Box>
  );
};

export default TodosLists;
