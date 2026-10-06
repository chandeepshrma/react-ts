import { useContext } from "react";
import UserContext, { type UserContextType } from "../context/UserContext";

function Sidebar() {
    const { user } = useContext<UserContextType | null>(UserContext) ?? { user: "" };
  return (
    <>
    Hi, {user}
        <ul>
          <li className="hover:bg-gray-200 cursor-pointer p-2! border-b!">
            Home
          </li>
          <li className="hover:bg-gray-200 cursor-pointer p-2! border-b!">
            Dashboard
          </li>
          <li className="hover:bg-gray-200 cursor-pointer p-2! border-b!">
            About
          </li>
        </ul>
      </>
  )
}

export default Sidebar;