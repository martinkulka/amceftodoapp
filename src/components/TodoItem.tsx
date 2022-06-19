import { Paper, Typography } from "@mui/material";
import { Todo } from "../types";
import { styled } from "@mui/system";

const Item = styled(Paper)(() => ({
  textAlign: "center",
  width: "50vh",
}));

const TodoItem = ({ data }: { data: Todo }) => {
  return (
    <Item>
      <Typography variant="h5">{data.title}</Typography>
      <Typography>{data.comment}</Typography>
      <Typography>{data.deadline}</Typography>
      <Typography>{data.finished ? "true" : "false"}</Typography>
    </Item>
  );
};

export default TodoItem;
