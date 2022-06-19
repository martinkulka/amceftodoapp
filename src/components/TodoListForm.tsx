import { Box, Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

const TodoListForm = () => {
  const { control, handleSubmit } = useForm();
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        m={2}
        pt={2}
      >
        <Controller
          name="listName"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="List Name"
              variant="filled"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              sx={{ width: "50vw" }}
            />
          )}
          rules={{ required: "Name required" }}
        />
        <Box m={2}>
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default TodoListForm;
