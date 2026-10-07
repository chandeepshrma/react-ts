import { useContext } from "react";
import type { UserContextType } from "../../shared/context/UserContext";
import UserContext from "../../shared/context/UserContext";
import AgGrid from "../../shared/components/AgGrid";
import Todos from "../todos/Todos";

function Home() {
  const context = useContext<UserContextType | null>(UserContext);

  if (!context) {
    throw new Error("Home must be used inside UserProvider");
  }

  const { setUser } = context;

  return (
    <>
      <div onClick={() => setUser("Home User")}>Home Page</div>
      <Todos />
    </>
  );
}

export default Home;