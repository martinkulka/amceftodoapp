import { Box, Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";

interface props {
  parentId: string | undefined;
  handleAddItem: (parentId: string | undefined, title: string, comment: string, deadline: Date) => void;
}

const TodoItemForm = ({ parentId, handleAddItem }: props) => {
  const { control, handleSubmit } = useForm();
  const onSubmit = handleSubmit((data) => handleAddItem(parentId, data.title, data.comment, data.deadline));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={onSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          m={2}
          pt={2}
        >
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Todo Title"
                variant="filled"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                sx={{ width: "50vw" }}
              />
            )}
            rules={{ required: "Title required" }}
          />
          <Controller
            name="comment"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Todo Comment"
                variant="filled"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                sx={{ width: "50vw" }}
              />
            )}
            rules={{ required: "Comment required" }}
          />
          <Controller
            name="deadline"
            control={control}
            defaultValue={""}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DateTimePicker
                label="Todo Deadline"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    error={!!error}
                    helperText={error ? error.message : null}
                    sx={{ width: "50vw" }}
                  />
                )}
                value={value}
                onChange={onChange}
              />
            )}
            rules={{ required: "Deadline required" }}
          />
          <Box m={2}>
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </Box>
        </Box>
      </form>
    </LocalizationProvider>
  );
};

export default TodoItemForm;
