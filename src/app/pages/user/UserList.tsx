import { useCallback } from "react";
import { BiCut } from "react-icons/bi";

import {
  removeUser,
  type UserSliceType,
} from "../../shared/features/usersSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../shared/store/hooks";

function UserList() {
  const dispatch = useAppDispatch();

  const users = useAppSelector(
    (state) => state.user.users,
  );

  const handleRemoveUser = useCallback(
    (userId: string) => {
      dispatch(removeUser(userId));
    },
    [dispatch],
  );

  return (
    <ul className="px-5! mt-2!">
      <li className="block mb-3! font-semibold! list-none">
        Users
      </li>

      {users.map((user: UserSliceType, index: number) => (
        <li
          key={user.id}
          className={`list-disc justify-between flex p-2! ${
            index % 2 === 0
              ? "bg-amber-200"
              : "bg-blue-400"
          }`}
        >
          <span>
            Name:{" "}
            <b className="text-indigo-600">
              {user.name}
            </b>
            , Email:{" "}
            <b className="text-indigo-600">
              {user.email}
            </b>
          </span>

          <button
            className="block ms-2! px-2! bg-red-700! text-white! rounded-md font-medium! cursor-pointer"
            type="button"
            onClick={() => handleRemoveUser(user.id)}
          >
            <BiCut
              className="inline-block size-5 shrink-0 align-middle"
              aria-hidden="true"
            />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default UserList;