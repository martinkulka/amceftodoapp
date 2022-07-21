import DeleteIcon from "@mui/icons-material/DeleteTwoTone";
import CheckIcon from "@mui/icons-material/Check";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { Todo, TodoChangeFinishedPayload, TodoDeletePayload } from "../types";
import { styled } from "@mui/system";
import { useAppDispatch } from "../app/hooks";
import {
  changeFinishedFetch,
  deleteTodoFetch,
} from "../features/todos/todoSlice";

interface props {
  data: Todo;
}

const Item = styled(Paper)(() => ({
  textAlign: "center",
  width: "50vw",
}));

const TodoItem = ({ data }: props) => {
  const dispatch = useAppDispatch();

  return (
    <Item>
      <Box sx={{ textDecoration: data.finished ? "line-through" : "none" }}>
        <Typography variant="h5">{data.title}</Typography>
        <Typography>{data.comment}</Typography>
        <Typography>{data.deadline}</Typography>
        <Typography>{data.finished ? "Finished" : "Unfinished"}</Typography>
        <Box width="100%">
          <IconButton
            onClick={() =>
              dispatch(
                deleteTodoFetch({
                  id: data.id,
                  todoslistId: data.todoslistId,
                } as TodoDeletePayload)
              )
            }
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              dispatch(
                changeFinishedFetch({
                  id: data.id,
                  todoslistId: data.todoslistId,
                } as TodoChangeFinishedPayload)
              )
            }
          >
            <CheckIcon />
          </IconButton>
        </Box>
      </Box>
    </Item>
  );
};

export default TodoItem;
