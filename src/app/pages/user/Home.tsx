import { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { useAppSelector } from "../../shared/store/hooks";
import Todos from "../todos/Todos";

export default function Home() {
  const [today] = useState(() => new Date());
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div className="max-w-330 m-auto">
      <div
        className="flex items-center justify-between gap-5 mb-7 [&_h1]:m-0 [&_h1]:text-[clamp(25px,_2.5vw,_34px)] [&_h1]:font-[650]
          [&_h1]:tracking-[-1.1px] [&_h1]:leading-[1.3] [&_>_div_>_p:last-child]:mt-2.25 [&_>_div_>_p:last-child]:mx-0
          [&_>_div_>_p:last-child]:mb-0 [&_>_div_>_p:last-child]:text-(--ws-muted) [&_>_div_>_p:last-child]:text-[13px]"
      >
        <div>
          <p className="mt-0 mx-0 mb-2.25 text-[10px] font-[650] tracking-[1.8px] text-(--ws-accent)">
            YOUR WORK, SIMPLIFIED
          </p>
          <h1>
            Welcome back{user?.firstName ? `, ${user.firstName}` : ""}
            <span className="text-(--ws-accent)">.</span>
          </h1>
          <p>Here's what's on your list. Let's make today count.</p>
        </div>
        <span
          className="flex items-center shrink-0 gap-2 py-2.5 px-3.25 border border-(--ws-border) rounded-lg bg-(--ws-surface)
          text-(--ws-muted) text-[11px] max-[1100px]:hidden"
        >
          <FiCalendar />
          {new Intl.DateTimeFormat("en", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }).format(today)}
        </span>
      </div>
      <Todos />
      <footer className="flex justify-between gap-3 pt-5.5 px-0 pb-0 text-[10px] text-(--ws-muted)">
        <span>Made for a more focused day.</span>
        <span>Architects workspace</span>
      </footer>
    </div>
  );
}
