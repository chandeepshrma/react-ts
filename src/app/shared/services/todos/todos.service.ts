import axios from "axios";
import type { ITodo, Todo } from "./todos.model";

export const addTodo = async (
  payload: Todo
): Promise<ITodo> => {
  const response = await axios.post(`https://dummyjson.com/todos/add`, payload);

  if (!response.data) {
    throw new Error("Failed to add todo");
  }

  return response.data;
};

export const getAllTodos = async (): Promise<ITodo[]> => {
  const response = await axios.get("https://dummyjson.com/todos");

  if (!response.data) {
    throw new Error("Failed to fetch todos");
  }

  return response.data.todos;
};

export const getTodoById = async (
  id: number
): Promise<ITodo> => {
  const response = await axios.get(`https://dummyjson.com/todos/${id}`);

  if (!response.data) {
    throw new Error("Failed to fetch todo");
  }

  return response.data.json();
};

export const updateTodo = async (
  id: number,
  payload: Todo
): Promise<ITodo> => {
  const response = await axios.put(`https://dummyjson.com/todos/${id}`, payload);

  if (!response.data) {
    throw new Error("Failed to update todo");
  }

  return response.data.json();
};
