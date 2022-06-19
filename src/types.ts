export interface Todo {
    title: string;
    comment: string;
    deadline: string;
    finished: boolean;
    id: number;
    todoslistId: number;
}

export interface TodosList {
    name: string;
    todos: Todo[];
    id: number;
}