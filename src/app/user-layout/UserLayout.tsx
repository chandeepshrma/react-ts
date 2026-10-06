import { Card, Theme } from "@chakra-ui/react";
import Header from "../shared/components/Header";
import { Outlet } from "react-router/internal/react-server-client";
import Sidebar from "../shared/components/Sidebar";
import UserContextProvider from "../shared/context/UserContextProvider";
import { useColorMode } from "../../components/ui/color-mode";

function UserLayout() {
  const { colorMode } = useColorMode();
  return (
    <Theme appearance={colorMode}>
      <UserContextProvider>
        <header>
          <Header />
        </header>
        <div className="flex">
          <aside className="w-2/12 shadow-sm border-r-2! border-gray-50 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 h-[calc(100vh-70px)]">
            <Sidebar />
          </aside>
          <div className="w-10/12">
            <main>
              <Card.Root className="p-3! h-full w-full!">
                <Outlet />
              </Card.Root>
            </main>
          </div>
        </div>
      </UserContextProvider>
    </Theme>
  );
}

export default UserLayout;
