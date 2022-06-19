import { Box, Link } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import TodoListsPage from "./pages/TodoListsPage";

function App() {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      m={2}
      pt={3}
    >
      <Link href="/" variant="h1" underline="hover">
        To-do lists
      </Link>
      <Routes>
        <Route path="/" element={<TodoListsPage />} />
        <Route path="/:listId" element={<TodoPage />} />
      </Routes>
    </Box>
  );
}

export default App;
