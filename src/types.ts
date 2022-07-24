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
    id: number;
}

export interface TodoDeletePayload {
    id: number;
    todoslistId: number;
}

export type TodoChangeFinishedPayload = TodoDeletePayload;
export type TodoAddPayload = Omit<Todo, "finished" | "id">
export type TodoFilter = "all" | "finished" | "unfinished"