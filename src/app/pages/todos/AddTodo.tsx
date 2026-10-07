import { useForm } from "react-hook-form";
import { Todo, type ITodo } from "../../shared/services/todos/todos.model";
import { useMutation } from "@tanstack/react-query";
import { addTodo } from "../../shared/services/todos/todos.service";
import { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

interface AddTodoProps {
  data?: ITodo;
}
function AddTodo({ data }: AddTodoProps) {    
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ITodo>();

  const mutation = useMutation({
    mutationFn: addTodo,
  });

  const addTodoHandler = (formData: ITodo) => {
    const newTodo = {
      ...new Todo(),
      ...formData,
      userId: Math.floor(Math.random() * 55)
    };
    mutation.mutate(newTodo);
  };

    useEffect(() => {
      reset({
        ...data
      });
    }, [data, reset]);
  return (
    <>
    <div className="border! p-4! shadow-md rounded-md justify-center w-4/12">
    <div className="bg-blue-300 py-2! text-center">Add todo</div>
      <form onSubmit={handleSubmit(addTodoHandler)} className="mt-2!">
        <label htmlFor="" className="font-medium">
          Todo
        </label>
        <br />
        <textarea className="border! rounded-sm px-1! my-2!" rows={3} {...register("todo", {
            required: "Todo is required",
          })}></textarea>
        <br />
        {errors.todo && (
          <p className="text-red-600 text-sm!">{errors.todo.message}</p>
        )}
        <label htmlFor="" className="font-medium">
          Completed
        </label>
        <br />
        <label>
          <input
            type="radio"
            className="me-1!"
            value="true"
            {...register("completed", {
              required: "Completed is required",
              setValueAs: (value) => value === "true"
            })}
          />
          Yes
        </label>

        <label className="ms-3!">
          <input
            type="radio"
            className="me-1!"
            value="false"
            {...register("completed", {
              required: "Completed is required",
              setValueAs: (value) => value === "false"
            })}
          />
          No
        </label>
        <br />
        {errors.completed && (
          <p className="text-red-600 text-sm!">{errors.completed.message}</p>
        )}
        <button
          type="submit"
          className="p-2! bg-blue-700! text-white! rounded-md font-medium! cursor-pointer mt-2!"
        >
          Add User
        </button>
      </form>
    </div>
    </>
  );
}

export default AddTodo;
