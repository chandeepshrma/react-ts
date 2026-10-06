import { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string>('Dummy User');
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;