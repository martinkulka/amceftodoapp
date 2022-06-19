import DeleteIcon from "@mui/icons-material/DeleteTwoTone";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { Todo } from "../types";
import { styled } from "@mui/system";

interface props {
  data: Todo;
  handleDeleteItem: (parentId: number, itemId: number) => void;
}

const Item = styled(Paper)(() => ({
  textAlign: "center",
  width: "30vw",
}));

const TodoItem = ({ data, handleDeleteItem }: props) => {
  return (
    <Item>
      <Typography variant="h5">{data.title}</Typography>
      <Typography>{data.comment}</Typography>
      <Typography>{data.deadline}</Typography>
      <Typography>{data.finished ? "Finished" : "Unfinished"}</Typography>
      <Box width="100%">
        <IconButton onClick={() => handleDeleteItem(data.todoslistId, data.id)}>
          <DeleteIcon />
        </IconButton>

      </Box>
    </Item>
  );
};

export default TodoItem;
