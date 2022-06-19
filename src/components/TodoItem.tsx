import DeleteIcon from "@mui/icons-material/DeleteTwoTone";
import CheckIcon from '@mui/icons-material/Check';
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { Todo } from "../types";
import { styled } from "@mui/system";

interface props {
  data: Todo;
  handleDeleteItem: (parentId: number, itemId: number) => void;
  handleCheckFinished: (parentId: number, itemId: number) => void;
}

const Item = styled(Paper)(() => ({
  textAlign: "center",
  width: "30vw",
}));

const TodoItem = ({ data, handleDeleteItem, handleCheckFinished }: props) => {
  return (
    <Item>
      <Box sx={{ textDecoration: data.finished ? "line-through" : "none" }}>
        <Typography variant="h5">{data.title}</Typography>
        <Typography>{data.comment}</Typography>
        <Typography>{data.deadline}</Typography>
        <Typography>{data.finished ? "Finished" : "Unfinished"}</Typography>
        <Box width="100%">
          <IconButton
            onClick={() => handleDeleteItem(data.todoslistId, data.id)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => handleCheckFinished(data.todoslistId, data.id)}>
            <CheckIcon />
          </IconButton>
        </Box>
      </Box>
    </Item>
  );
};

export default TodoItem;
