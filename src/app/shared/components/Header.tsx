import Brand from "./Brand";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FiMoon, FiSun } from "react-icons/fi";
import { useColorMode } from "../../../components/ui/color-mode";
import { useAppSelector } from "../store/hooks";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useAppSelector((state) => state.auth.user);
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 h-19.5 flex items-center justify-between gap-5 py-0 px-9 border-b border-(--ws-border)
          transition-[background-color,box-shadow,backdrop-filter] duration-200 motion-reduce:transition-none
          max-[760px]:py-0 max-[760px]:px-5 max-[760px]:h-17 ${isScrolled
            ? "bg-(--ws-surface)/80 backdrop-blur-xs shadow-sm"
            : "bg-(--ws-surface)"}`}>
      <Link to="/home" aria-label="Architects home" className="flex items-center gap-5 text-(--ws-text) no-underline">
        <Brand />
        <span aria-hidden="true" className="h-6 w-px bg-(--ws-border) max-[760px]:hidden" />
        <span className="text-[13px] text-(--ws-muted) max-[760px]:hidden">Workspace</span>
      </Link>
      <div className="flex items-center gap-5 max-[760px]:gap-3">
        <button className="grid place-items-center w-9 h-9 border border-(--ws-border) rounded-[10px] bg-(--ws-surface) text-(--ws-muted) text-[17px]" onClick={toggleColorMode} aria-label={`Switch to ${colorMode === "dark" ? "light" : "dark"} mode`}>
          {colorMode === "dark" ? <FiSun /> : <FiMoon />}
        </button>
        <div className="flex items-center gap-2.5 pl-5 [border-left:1px_solid_var(--ws-border)] [&_strong]:block [&_strong]:text-xs
          [&_strong]:font-[650] [&_small]:block [&_small]:mt-0.5 [&_small]:text-(--ws-muted) [&_small]:text-[11px]
          max-[760px]:[&_>_div]:hidden max-[760px]:pl-0 max-[760px]:border-0"><span className="w-9 h-9 grid place-items-center rounded-full bg-[#eaf0ff] text-[#4d68a0] text-xs font-[650]">{user?.firstName?.charAt(0) || "U"}{user?.lastName?.charAt(0)}</span><div><strong>{user ? `${user.firstName} ${user.lastName}` : "Your account"}</strong><small>Personal workspace</small></div></div>
      </div>
    </header>
  );
}

