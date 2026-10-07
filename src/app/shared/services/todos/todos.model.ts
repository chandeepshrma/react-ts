export interface ITodo {
    id: number | null,
    todo: string,
    completed: boolean,
    userId: number,
}

export class Todo implements ITodo {
    id: number | null = null;
    todo: string = "";
    completed: boolean = false;
    userId: number = 0;
}