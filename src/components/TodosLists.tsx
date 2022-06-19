import { Box, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import gsAxios from "../api";
import { TodosList } from "../types";
import TodoListForm from "./TodoListForm";

const TodosLists = () => {
  const [lists, setLists] = useState<TodosList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = () => {
    setLoading(true);

    gsAxios.get<TodosList[]>("/todoslist").then((response) => {
      console.log(response.data);
      setLists(response.data);
      setLoading(false);
    });
  };

  /* const handleCreateList = (listName: string) => {
    
  }; */

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      m={2}
      pt={3}
    >
      {loading ? (
        <Typography variant="h2">Loading...</Typography>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center">
          {lists.length === 0 ? (
            <Typography variant="h4">
              No lists available, create some!
            </Typography>
          ) : (
            <></>
          )}
          {lists.map((todoList) => {
            return (
              <div className="todolist-container" key={todoList.id}>
                <Link href={`/${todoList.id}`} variant="h4">
                  {todoList.name}
                </Link>
              </div>
            );
          })}
          <TodoListForm />
        </Box>
      )}
    </Box>
  );
};

export default TodosLists;
