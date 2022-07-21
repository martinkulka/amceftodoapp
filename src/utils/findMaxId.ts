import { Todo, TodosList } from "../types";

export const findMaxId = (list: TodosList[] | Todo[]) => {
  let max = 0;

  list.forEach((item) => {
    if (item.id > max) {
      max = item.id;
    }
  });

  return max;
};
