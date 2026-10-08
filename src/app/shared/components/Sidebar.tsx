import { NavLink, useNavigate } from "react-router";
import { FiGrid, FiHome, FiLogOut, FiArrowUpRight } from "react-icons/fi";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../features/auth/authSlice";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <aside className="flex flex-col pt-8 px-4.5 pb-6 [border-right:1px_solid_var(--ws-border)] bg-(--ws-surface) [&_nav]:grid
          [&_nav]:gap-1.5 [&_nav_a]:flex [&_nav_a]:items-center [&_nav_a]:gap-3 [&_nav_a]:py-3 [&_nav_a]:px-3.5
          [&_nav_a]:rounded-lg [&_nav_a]:text-(--ws-muted) [&_nav_a]:no-underline [&_nav_a]:text-[13px] [&_nav_a]:font-[550]
          [&_nav_a_svg]:text-lg [&_nav_a:hover]:bg-(--ws-bg) [&_nav_a:hover]:text-(--ws-text) [&_nav_a.active]:bg-[#eaf0ff]
          [&_nav_a.active]:text-[#4670d3] max-[760px]:py-2.5 max-[760px]:px-5 max-[760px]:[border-right:0]
          max-[760px]:[border-bottom:1px_solid_var(--ws-border)] max-[760px]:flex-row max-[760px]:items-center
          max-[760px]:justify-between max-[760px]:gap-2.5 max-[760px]:[&_nav]:flex max-[760px]:[&_nav]:gap-1.5
          max-[760px]:[&_nav_a]:py-2.25 max-[760px]:[&_nav_a]:px-3 max-[760px]:[&_nav_a]:text-[11px]
          max-[760px]:[&_nav_a]:gap-1.75 max-[390px]:p-2.5 max-[390px]:[&_nav_a]:p-2.25">
      <div className="py-0 px-3.5 mb-3.75 text-(--ws-muted) text-[10px] font-[650] tracking-[1.6px] max-[760px]:hidden">WORKSPACE</div>
      <nav aria-label="Main navigation">
        <NavLink to="/home"><FiHome />Overview</NavLink>
        <NavLink to="/dashboard"><FiGrid />Manage users</NavLink>
      </nav>
      <div className="mt-auto pt-25 max-[760px]:m-0 max-[760px]:p-0">
        <div className="mt-0 mx-0.75 mb-6 py-4.5 px-3.5 border border-(--ws-border) rounded-xl
          [background:linear-gradient(135deg,_var(--ws-bg),_var(--ws-surface))] [&_strong]:block [&_strong]:text-[13px]
          [&_strong]:leading-normal [&_p]:mt-2 [&_p]:mx-0 [&_p]:mb-3.75 [&_p]:text-(--ws-muted) [&_p]:text-[11px]
          [&_p]:leading-[1.8] [&_a]:flex [&_a]:items-center [&_a]:gap-1.5 [&_a]:text-(--ws-accent) [&_a]:text-[11px]
          [&_a]:font-semibold [&_a]:no-underline max-[760px]:hidden"><span className="block mb-3 text-(--ws-accent) text-[25px]">✦</span><strong>A little focus goes a long way.</strong><p>Keep your tasks in one place and make room for your best work.</p><NavLink to="/home">Let's get organized <FiArrowUpRight /></NavLink></div>
        <button className="flex items-center gap-3 py-3 px-3.5 rounded-lg text-(--ws-muted) no-underline text-[13px] font-[550] w-full border-0
          bg-transparent text-left [&_svg]:text-lg hover:bg-(--ws-bg) hover:text-(--ws-text) max-[760px]:p-2.25
          max-[760px]:text-[11px] max-[760px]:gap-1.5" onClick={() => { dispatch(logout()); navigate("/login", { replace: true }); }}><FiLogOut />Sign out</button>
      </div>
    </aside>
  );
}
