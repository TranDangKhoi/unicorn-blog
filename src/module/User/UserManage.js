import { Button } from "components/Button";
import { useAuth } from "contexts/auth-context";

import DashboardHeading from "module/Category/DashboardHeading";
import { userRole } from "utils/constants";
import UserTable from "./UserTable";

const UserManage = () => {
  const { userInfo } = useAuth();
  if (userInfo?.role !== userRole.ADMIN && userInfo?.role !== userRole.MOD)
    return null;
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
