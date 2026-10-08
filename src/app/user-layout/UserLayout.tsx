import { Outlet } from "react-router";
import Header from "../shared/components/Header";
import Sidebar from "../shared/components/Sidebar";
import UserContextProvider from "../shared/context/UserContextProvider";
import { useColorMode } from "../../components/ui/color-mode";
import ErrorBoundary from "../core/error-boundary/ErrorBoundary";

export default function UserLayout() {
  const { colorMode } = useColorMode();
  return (
    <UserContextProvider>
      <div
        className="[--ws-bg:#f7f9fc] [--ws-surface:#fff] [--ws-text:#202c3e] [--ws-muted:#788497] [--ws-border:#e8edf3]
          [--ws-accent:#4675e8] min-h-svh bg-(--ws-bg) text-(--ws-text)
          [font-family:Inter,_-apple-system,_BlinkMacSystemFont,_'Segoe_UI',_sans-serif] text-sm
          [&[data-theme='dark']]:[--ws-bg:#111827] [&[data-theme='dark']]:[--ws-surface:#192335]
          [&[data-theme='dark']]:[--ws-text:#e6edf7] [&[data-theme='dark']]:[--ws-muted:#9aaac0]
          [&[data-theme='dark']]:[--ws-border:#2a374c] [&[data-theme='dark']]:[--ws-accent:#91b2ff]
          [&[data-theme='dark']]:[color-scheme:dark] [&_*]:box-border [&_button]:[-webkit-tap-highlight-color:transparent]
          [&_button]:cursor-pointer [&_a]:[-webkit-tap-highlight-color:transparent]
          [&_input]:[-webkit-tap-highlight-color:transparent] [&_textarea]:[-webkit-tap-highlight-color:transparent]
          [&_button:disabled]:cursor-wait [&_button:disabled]:opacity-65
          [&_button:focus-visible]:[outline:2px_solid_var(--ws-accent)] [&_button:focus-visible]:outline-offset-[3px]
          [&_a:focus-visible]:[outline:2px_solid_var(--ws-accent)] [&_a:focus-visible]:outline-offset-[3px]
          [&_input:focus-visible]:[outline:2px_solid_var(--ws-accent)] [&_input:focus-visible]:outline-offset-[3px]
          [&_textarea:focus-visible]:[outline:2px_solid_var(--ws-accent)] [&_textarea:focus-visible]:outline-offset-[3px]"
        data-theme={colorMode}
      >
        <a
          className="fixed top-[-60px] left-5 z-50 p-3 bg-(--ws-surface) focus:top-3"
          href="#workspace-content"
        >
          Skip to content
        </a>
        <Header />
        <div
          className="grid [grid-template-columns:230px_minmax(0,_1fr)] min-h-[calc(100svh_-_78px)]
          max-[1100px]:[grid-template-columns:190px_minmax(0,_1fr)] max-[760px]:block"
        >
          <Sidebar />
          <main
            id="workspace-content"
            className="scroll-mt-20 min-w-0 px-5 pt-4 pb-7 max-[760px]:px-4 max-[390px]:px-3"
          >
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </main>
        </div>
      </div>
    </UserContextProvider>
  );
}
