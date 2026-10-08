import { useCallback } from "react";
import { useForm } from "react-hook-form";

import { addUser } from "../../shared/features/usersSlice";
import { useAppDispatch } from "../../shared/store/hooks";

type UserFormData = {
  name: string;
  email: string;
};

function UserForm() {
    console.log('user Form rendered')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>();

  const dispatch = useAppDispatch();

  const handleAddUser = useCallback(
    (data: UserFormData) => {
      dispatch(addUser(data));
    },
    [dispatch],
  );

  return (
    <form onSubmit={handleSubmit(handleAddUser)} className="mt-2!">
      <label htmlFor="name" className="font-medium">
        Name
      </label>

      <br />

      <input
        id="name"
        className="border! rounded-sm px-1! my-2!"
        {...register("name", {
          required: "Name is required",
        })}
      />

      {errors.name && (
        <p className="text-red-600 text-sm!">
          {errors.name.message}
        </p>
      )}

      <br />

      <label htmlFor="email" className="font-medium">
        Email
      </label>

      <br />

      <input
        id="email"
        type="email"
        className="border! rounded-sm px-1! my-2!"
        {...register("email", {
          required: "Email is required",
        })}
      />

      {errors.email && (
        <p className="text-red-600 text-sm!">
          {errors.email.message}
        </p>
      )}

      <br />

      <button
        type="submit"
        className="p-2! bg-blue-700! text-white! rounded-md font-medium! cursor-pointer"
      >
        Add User
      </button>
    </form>
  );
}

export default UserForm;