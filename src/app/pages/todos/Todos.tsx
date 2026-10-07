import { useQuery } from "@tanstack/react-query"
import { getAllTodos } from "../../shared/services/todos/todos.service"
import { Icon } from "@chakra-ui/react"
import { BiCut } from "react-icons/bi"
import AddTodo from "./AddTodo"
import { Todo, type ITodo } from "../../shared/services/todos/todos.model"
import { useState } from "react"
import AgGrid from "../../shared/components/AgGrid"

function Todos() {
  const [selectedTodo, setSelectedTodo] = useState<ITodo | undefined>(undefined);
  const { data: todos, isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: getAllTodos,
  })
  
  if (isLoading) {
    return <div>Loading...</div>
  }
  
  if (isError) {
    return <div>Something went wrong!!!</div>
  }
  
  const colDefs = Object.keys(todos?.at(0) as ITodo)?.map((key)=>{
    return {field: `${key}`}
  })
  
  return (
    <>
    <AddTodo data={selectedTodo} />
      <b className="border-b! pb-2!">My Todos : </b>

      <AgGrid rowData={todos} colDefs={colDefs} />

      {/* <ul className="max-h-100! overflow-y-auto">
        {todos?.map((todo) => (
          <li
            key={todo.id}
            className={`p-1.5! my-2! rounded-md ${(todo.id || 0) % 2 === 0 ? 'bg-amber-200' : 'bg-blue-400'}`}
          >
            ID: {todo.id}, Todo: {todo.todo}, Complete: {todo.completed ? 'Yes' : 'No'}, UserID: {todo.userId}
          <button
            className="block ms-2! px-2! bg-red-700! text-white! rounded-md font-medium! cursor-pointer"
            type="button"
            onClick={()=>{setSelectedTodo(todo)}}
          >
            <Icon boxSize={5}>
              <BiCut />
            </Icon>
          </button>
          </li>
        ))}
      </ul> */}
    </>
  )
}

export default Todos