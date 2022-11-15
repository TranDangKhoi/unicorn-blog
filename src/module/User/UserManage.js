import { Button } from "components/Button";
import DashboardHeading from "module/Category/DashboardHeading";
import UserTable from "./UserTable";

const UserManage = () => {
  return (
    <>
      <div className="flex justify-between">
        <DashboardHeading
          title="Users"
          desc="Manage your user"
        ></DashboardHeading>
        <Button to="/manage/add-user" kind="ghost">
          Create a new user
        </Button>
      </div>
      <UserTable></UserTable>
    </>
  );
};

export default UserManage;
