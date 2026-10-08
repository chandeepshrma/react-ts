import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { BiCut } from "react-icons/bi";

import {
  addUser,
  removeUser,
  type UserSliceType,
} from "../../shared/features/usersSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../shared/store/hooks";
import UserForm from "./UserForm";
import UserList from "./UserList";

type UserForm = {
  name: string;
  email: string;
};

function Dashboard() {
  console.log('Dashboard rendered')
  return (
    <>
      <UserForm />
      <UserList />
    </>
  );
}

export default Dashboard;