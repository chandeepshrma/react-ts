import { useContext } from "react";
import type { UserContextType } from "../../shared/context/UserContext";
import UserContext from "../../shared/context/UserContext";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  removeUser,
  type UserSliceType,
} from "../../shared/features/usersSlice";
import { Icon } from "@chakra-ui/react";
import { BiCut } from "react-icons/bi";
type UserForm = {
  name: string;
  email: string;
};

function Dashboard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>();
  const context = useContext<UserContextType | null>(UserContext);
  const dispatch = useDispatch();
  const users = useSelector((state: { users: UserSliceType[] }) => state.users);
  if (!context) {
    throw new Error("Dashboard must be used inside UserProvider");
  }

  const { setUser } = context;

  const handleAddUser = (data: UserForm) => {
    console.log(data);

    dispatch(addUser(data));
  };

  const handleRemoveUser = (userID: string) => {
    dispatch(removeUser(userID));
  };

  return (
    <>
      <div onClick={() => setUser("Dashboard User")}>Add user</div>

      <form onSubmit={handleSubmit(handleAddUser)} className="mt-2!">
        <label htmlFor="" className="font-medium">
          Name
        </label>
        <br />
        <input
          className="border! rounded-sm px-1! my-2!"
          {...register("name", {
            required: "Name is required",
          })}
        />
        <br />
        {errors.name && (
          <p className="text-red-600 text-sm!">{errors.name.message}</p>
        )}
        <label htmlFor="" className="font-medium">
          Email
        </label>
        <br />
        <input
          className="border! rounded-sm px-1! my-2!"
          {...register("email", {
            required: "Email is required",
          })}
        />
        <br />
        {errors.email && (
          <p className="text-red-600 text-sm!">{errors.email.message}</p>
        )}
        <button
          type="submit"
          className="p-2! bg-blue-700! text-white! rounded-md font-medium! cursor-pointer"
        >
          Add User
        </button>
      </form>

      <ul className="px-5! mt-2!">
        <li className="block mb-3! font-semibold! list-none">Users</li>
        {users.map((user: UserSliceType, index: number) => (
          <li
            key={user.id}
            className={`list-disc justify-between flex p-2! ${index % 2 === 0 ? "bg-amber-200" : "bg-blue-400"}`}
          >
            <span>
              Name: <b className="text-indigo-600">{user.name}</b>, Email:{" "}
              <b className="text-indigo-600">{user.email}</b>
            </span>
            <button
              className="block ms-2! px-2! bg-red-700! text-white! rounded-md font-medium! cursor-pointer"
              type="button"
              onClick={() => handleRemoveUser(user.id)}
            >
              <Icon boxSize={5}>
                <BiCut />
              </Icon>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Dashboard;
