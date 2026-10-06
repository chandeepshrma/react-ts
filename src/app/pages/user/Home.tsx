import { useContext } from "react";
import type { UserContextType } from "../../shared/context/UserContext";
import UserContext from "../../shared/context/UserContext";

function Home() {
    const { setUser } = useContext<UserContextType | null>(UserContext) ?? { setUser: () => {} };    
  return (
    <div onClick={()=> setUser("Home User")}>Home Page</div>
  )
}

export default Home