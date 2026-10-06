import { useContext } from "react";
import type { UserContextType } from "../../shared/context/UserContext";
import UserContext from "../../shared/context/UserContext";

function Dashboard() {
  const context = useContext<UserContextType | null>(UserContext);
  if (!context) {
    throw new Error("Dashboard must be used inside UserProvider");
  }

  const { setUser } = context;
  return <div onClick={() => setUser("Dashboard User")}>Dashboard Page</div>;
}

export default Dashboard;
