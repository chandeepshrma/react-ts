import UserForm from "./UserForm";
import UserList from "./UserList";

type UserForm = {
  name: string;
  email: string;
};

function Dashboard() {
  return (
    <>
      <UserForm />
      <UserList />
    </>
  );
}

export default Dashboard;