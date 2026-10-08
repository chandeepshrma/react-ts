import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ITodo } from "../../shared/services/todos/todos.model";
import { addTodo } from "../../shared/services/todos/todos.service";
import { useAppSelector } from "../../shared/store/hooks";

interface AddTodoProps { data?: ITodo; onSuccess?: () => void }
type TaskForm = { todo: string; completed: boolean };

export default function AddTodo({ data, onSuccess }: AddTodoProps) {
  const user = useAppSelector((state) => state.auth.user);
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TaskForm>({ defaultValues: { todo: "", completed: false } });
  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: (created) => {
      queryClient.setQueryData<ITodo[]>(["todos"], (current = []) => [{ ...created, id: -Date.now() }, ...current]);
      reset({ todo: "", completed: false });
      onSuccess?.();
    },
  });
  useEffect(() => { reset({ todo: data?.todo ?? "", completed: data?.completed ?? false }); }, [data, reset]);
  return (
    <form className="[&_>_label]:block [&_>_label]:mb-2.25 [&_>_label]:text-xs [&_>_label]:font-semibold [&_textarea]:w-full
          [&_textarea]:p-3 [&_textarea]:border [&_textarea]:border-(--ws-border) [&_textarea]:rounded-[7px]
          [&_textarea]:bg-(--ws-surface) [&_textarea]:resize-y [&_textarea]:[font-family:inherit] [&_textarea]:text-[13px]
          [&_input]:[accent-color:#4e77dc]" onSubmit={handleSubmit((values) => mutation.mutate({ ...values, todo: values.todo.trim(), id: null, userId: user?.id ?? 1 }))}>
      <label htmlFor="task-description">What needs to get done?</label>
      <textarea id="task-description" autoFocus rows={2} placeholder="Write a clear, actionable task…" aria-invalid={!!errors.todo} aria-describedby={errors.todo ? "task-description-error" : undefined} {...register("todo", { validate: (value) => !!value.trim() || "Please enter a task." })} />
      {errors.todo && <p id="task-description-error" className="mt-2 text-[#cc4559] text-xs" role="alert">{errors.todo.message}</p>}
      <div className="flex items-center justify-between gap-3 mt-3 [&_label]:flex [&_label]:items-center [&_label]:gap-2
          [&_label]:text-(--ws-muted) [&_label]:text-xs"><label><input type="checkbox" {...register("completed")} />Already completed</label><button className="inline-flex items-center justify-center gap-1.75 shrink-0 min-h-9 py-2 px-3.5 border border-[#4269d2] rounded-[7px]
          bg-[#4e77dc] shadow-[0_2px_3px_#315bb218] text-[#fff] text-[11px] font-semibold hover:bg-[#3b64c9]" disabled={mutation.isPending}>{mutation.isPending ? "Adding…" : "Add task"}</button></div>
      {mutation.isError && <p className="mt-2 text-[#cc4559] text-xs" role="alert">Couldn't add this task. Please try again.</p>}
    </form>
  );
}
