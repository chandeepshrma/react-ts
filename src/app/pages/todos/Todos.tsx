import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiCheckCircle, FiCircle, FiClipboard, FiClock, FiPlus, FiSearch, FiX } from "react-icons/fi";
import { getAllTodos } from "../../shared/services/todos/todos.service";
import AddTodo from "./AddTodo";

type Filter = "all" | "pending" | "completed";

export default function Todos() {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { data: todos = [], isLoading, isError, refetch } = useQuery({ queryKey: ["todos"], queryFn: getAllTodos });
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = todos.length - completed;
  const visible = todos.filter((todo) => (filter === "all" || (filter === "completed" ? todo.completed : !todo.completed)) && todo.todo.toLowerCase().includes(search.toLowerCase()));
  const progress = todos.length ? Math.round(completed / todos.length * 100) : 0;
  const stats = [
    { label: "Total tasks", value: todos.length, icon: <FiClipboard />, detail: "Everything in your workspace", style: "blue" },
    { label: "In progress", value: pending, icon: <FiClock />, detail: "Ready for your next step", style: "amber" },
    { label: "Completed", value: completed, icon: <FiCheckCircle />, detail: "One less thing on your mind", style: "green" },
  ];
  return (
    <>
      <div className="grid grid-cols-3 gap-4.5 max-[760px]:gap-2.5">{stats.map((stat) => <article className="flex justify-between gap-3 p-5.5 border border-(--ws-border) rounded-xl bg-(--ws-surface)
          shadow-[0_2px_3px_#1e315003] [&_>_div_>_span]:text-(--ws-muted) [&_>_div_>_span]:text-xs [&_>_div_>_span]:font-[550]
          [&_strong]:block [&_strong]:mt-2.25 [&_strong]:mx-0 [&_strong]:mb-1.5 [&_strong]:text-3xl [&_strong]:leading-[1.2]
          [&_strong]:font-[650] [&_strong]:tracking-[-1px] [&_p]:m-0 [&_p]:text-[11px] [&_p]:text-(--ws-muted)
          max-[1100px]:p-4 max-[1100px]:[&_p]:leading-[1.6] max-[760px]:relative max-[760px]:py-4 max-[760px]:px-3
          max-[760px]:[&_strong]:text-[26px] max-[760px]:[&_p]:text-[10px] max-[390px]:py-3.25 max-[390px]:px-2.5
          max-[390px]:[&_>_div_>_span]:text-[11px]" key={stat.label}><div><span>{stat.label}</span><strong>{isLoading || isError ? "—" : stat.value}</strong><p>{stat.detail}</p></div><span className={`grid place-items-center shrink-0 w-9.5 h-9.5 rounded-[10px] text-lg [&.blue]:text-[#517bdf] [&.blue]:bg-[#edf2ff] [&.amber]:text-[#c18b31] [&.amber]:bg-[#fff6e5] [&.green]:text-[#3b9c7d] [&.green]:bg-[#eaf8f1] max-[760px]:w-6.5 max-[760px]:h-6.5 max-[760px]:text-sm max-[760px]:absolute max-[760px]:top-10.75 max-[760px]:right-3 max-[390px]:hidden ${stat.style}`}>{stat.icon}</span></article>)}</div>
      <section className="flex items-center gap-3.75 mt-5.5 mx-0 mb-7 py-4.75 px-5.5 border border-(--ws-border) rounded-xl
          [background:linear-gradient(110deg,_var(--ws-surface),_var(--ws-bg))] [&_strong]:text-xs [&_strong]:font-semibold
          [&_p]:mt-1 [&_p]:mx-0 [&_p]:mb-0 [&_p]:text-(--ws-muted) [&_p]:text-[11px] [&_progress]:block
          [&_progress]:appearance-none [&_progress]:w-full [&_progress]:h-1.25 [&_progress]:border-0 [&_progress]:rounded-lg
          [&_progress]:overflow-hidden [&_progress]:bg-(--ws-border) [&_progress::-webkit-progress-bar]:bg-(--ws-border)
          [&_progress::-webkit-progress-value]:bg-[#7498ef] [&_progress::-webkit-progress-value]:rounded-lg
          [&_progress::-moz-progress-bar]:bg-[#7498ef] max-[760px]:flex-wrap max-[760px]:p-4" aria-label="Task completion"><span className="grid place-items-center w-9 h-9 shrink-0 rounded-full bg-[#eaf0ff] text-[#5c80d8] text-lg"><FiCheckCircle /></span><div><strong>{progress === 100 ? "All caught up. Nicely done!" : "Small steps. Steady progress."}</strong><p>{isError ? "Progress is unavailable right now." : isLoading ? "Loading your progress…" : `${completed} of ${todos.length} tasks completed. ${pending ? "You've got this." : "You're ready for what's next."}`}</p></div><div className="w-45 ml-auto shrink-0 [&_>_span]:flex [&_>_span]:justify-between [&_>_span]:mb-2 [&_>_span]:text-(--ws-muted)
          [&_>_span]:text-[10px] [&_strong]:text-(--ws-accent) [&_strong]:text-[10px] max-[1100px]:w-32.5 max-[760px]:w-full
          max-[760px]:mt-0.75"><span>Completion <strong>{isLoading || isError ? "—" : `${progress}%`}</strong></span><progress max={100} value={progress} aria-label="Tasks completed" /></div></section>
      <section className="overflow-hidden border border-(--ws-border) rounded-xl bg-(--ws-surface)" aria-labelledby="tasks-title">
        <div className="flex items-center justify-between gap-3.75 py-5.75 px-6 [&_h2]:flex [&_h2]:items-center [&_h2]:gap-2.25 [&_h2]:m-0
          [&_h2]:text-[17px] [&_h2]:font-[650] [&_h2]:tracking-[-.3px] [&_h2_span]:py-0.5 [&_h2_span]:px-1.75
          [&_h2_span]:rounded-[5px] [&_h2_span]:bg-(--ws-bg) [&_h2_span]:text-(--ws-muted) [&_h2_span]:text-[10px]
          [&_h2_span]:font-[550] [&_p]:mt-1.25 [&_p]:mx-0 [&_p]:mb-0 [&_p]:text-[11px] [&_p]:text-(--ws-muted)
          max-[760px]:py-5 max-[760px]:px-4 max-[390px]:[&_p]:max-w-37.5"><div><h2 id="tasks-title">Your tasks <span>{todos.length}</span></h2><p>A clear view of what needs to get done.</p></div><button className="inline-flex items-center justify-center gap-1.75 shrink-0 min-h-9 py-2 px-3.5 border border-[#4269d2] rounded-[7px]
          bg-[#4e77dc] shadow-[0_2px_3px_#315bb218] text-[#fff] text-[11px] font-semibold hover:bg-[#3b64c9]" aria-expanded={showForm} aria-controls="new-task-form" onClick={() => setShowForm(!showForm)}>{showForm ? <FiX /> : <FiPlus />}{showForm ? "Close form" : "New task"}</button></div>
        {showForm && <div id="new-task-form" className="mt-0 mx-6 mb-5 p-5 border border-(--ws-border) rounded-[9px] bg-(--ws-bg) max-[760px]:mt-0 max-[760px]:mx-4
          max-[760px]:mb-4.5 max-[760px]:p-3.5"><AddTodo onSuccess={() => setShowForm(false)} /></div>}
        <div className="flex items-center justify-between flex-wrap gap-3.75 pt-0 px-6 pb-4.5 max-[760px]:pt-0 max-[760px]:px-4 max-[760px]:pb-4"><div className="flex gap-0.75 p-1 rounded-lg bg-(--ws-bg) [&_button]:py-1.75 [&_button]:px-2.75 [&_button]:border-0
          [&_button]:rounded-[5px] [&_button]:bg-transparent [&_button]:text-(--ws-muted) [&_button]:text-[11px]
          [&_button]:whitespace-nowrap [&_button[aria-pressed='true']]:bg-(--ws-surface)
          [&_button[aria-pressed='true']]:text-(--ws-text) [&_button[aria-pressed='true']]:shadow-[0_1px_4px_#15294914]
          [&_button[aria-pressed='true']]:font-semibold max-[390px]:[&_button]:py-1.75 max-[390px]:[&_button]:px-2.25" aria-label="Filter tasks">{(["all", "pending", "completed"] as const).map((value) => <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value === "all" ? "All tasks" : value === "pending" ? "In progress" : "Completed"}</button>)}</div><label className="flex items-center gap-2 w-55 py-2 px-2.75 border border-(--ws-border) rounded-[7px] text-(--ws-muted)
          [&_input]:w-full [&_input]:min-w-0 [&_input]:border-0 [&_input]:outline-none [&_input]:bg-transparent
          [&_input]:text-(--ws-text) [&_input]:text-[11px] focus-within:border-(--ws-accent) max-[760px]:w-full"><FiSearch /><input aria-label="Search tasks" placeholder="Search tasks…" value={search} onChange={(event) => setSearch(event.target.value)} /></label></div>
        {isLoading ? <div className="flex flex-col items-center gap-2.5 py-15 px-5 text-(--ws-muted) text-center [&>svg]:text-[28px]
          [&_h3]:text-(--ws-text) [&_h3]:text-base [&_h3]:font-semibold [&_p]:text-[13px]" role="status">Loading your tasks…</div> : isError ? <div className="flex flex-col items-center gap-2.5 py-15 px-5 text-(--ws-muted) text-center [&>svg]:text-[28px]
          [&_h3]:text-(--ws-text) [&_h3]:text-base [&_h3]:font-semibold [&_p]:text-[13px]" role="alert"><FiClipboard /><h3>We couldn't load your tasks</h3><p>Please try again in a moment.</p><button className="inline-flex items-center justify-center gap-1.75 shrink-0 min-h-9 py-2 px-3.5 border border-[#4269d2] rounded-[7px]
          bg-[#4e77dc] shadow-[0_2px_3px_#315bb218] text-[#fff] text-[11px] font-semibold hover:bg-[#3b64c9]" onClick={() => refetch()}>Try again</button></div> : !visible.length ? <div className="flex flex-col items-center gap-2.5 py-15 px-5 text-(--ws-muted) text-center [&>svg]:text-[28px]
          [&_h3]:text-(--ws-text) [&_h3]:text-base [&_h3]:font-semibold [&_p]:text-[13px]"><FiSearch /><h3>{todos.length ? "No matching tasks" : "A fresh start"}</h3><p>{todos.length ? "Try another search or change the status filter." : "Create your first task to get started."}</p></div> : <div className="max-h-130 overflow-auto"><table className="w-full border-collapse text-left [&_thead]:sticky [&_thead]:top-0 [&_thead]:z-1 [&_thead]:bg-(--ws-bg) [&_th]:py-3
          [&_th]:px-6 [&_th]:[border-block:1px_solid_var(--ws-border)] [&_th]:text-(--ws-muted) [&_th]:text-[10px]
          [&_th]:font-[550] [&_th]:whitespace-nowrap [&_td]:py-4.25 [&_td]:px-6
          [&_td]:[border-bottom:1px_solid_var(--ws-border)] [&_td]:text-xs [&_tbody_tr:last-child_td]:border-0
          [&_tbody_tr:hover]:bg-(--ws-bg) [&_td:first-child]:w-[70%] max-[1100px]:[&_td]:pl-4.5 max-[1100px]:[&_td]:pr-4.5
          max-[1100px]:[&_th]:pl-4.5 max-[1100px]:[&_th]:pr-4.5 max-[760px]:min-w-135"><thead><tr><th scope="col">Task name</th><th scope="col">Status</th><th scope="col">User ID</th></tr></thead><tbody>{visible.map((todo, index) => <tr key={`${todo.id}-${index}`}><td><span className={`flex items-center gap-3 leading-[1.6] [&_svg]:shrink-0 [&_svg]:text-[17px] [&_svg]:text-[#b1bfd0] [&.is-complete_svg]:text-[#55a68b] [&.is-complete]:text-(--ws-muted) ${todo.completed ? "is-complete" : ""}`}>{todo.completed ? <FiCheckCircle /> : <FiCircle />}<span>{todo.todo}</span></span></td><td><span className={`inline-flex items-center gap-1.5 py-1 px-2 rounded-[5px] whitespace-nowrap text-[10px] [&_i]:w-1.25 [&_i]:h-1.25 [&_i]:rounded-full [&_i]:bg-[currentColor] [&.completed]:text-[#328568] [&.completed]:bg-[#edf8f2] [&.pending]:text-[#a47728] [&.pending]:bg-[#fff7e7] ${todo.completed ? "completed" : "pending"}`}><i />{todo.completed ? "Completed" : "In progress"}</span></td><td><span className="text-(--ws-muted) text-[11px]">#{todo.userId}</span></td></tr>)}</tbody></table></div>}
        {!isLoading && !isError && <div className="flex justify-between gap-3.75 py-3.75 px-6 [border-top:1px_solid_var(--ws-border)] text-(--ws-muted) text-[10px]
          max-[760px]:py-3.5 max-[760px]:px-4 max-[760px]:flex-col max-[760px]:gap-1.25">Showing {visible.length} of {todos.length} tasks<span>Demo workspace · changes last for this session</span></div>}
      </section>
    </>
  );
}
