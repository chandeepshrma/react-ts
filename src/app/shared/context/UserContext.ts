import { createContext } from "react";

export type UserContextType = {
  user: string;
  setUser: (user: string) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;