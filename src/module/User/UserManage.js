import { Button } from "components/Button";
import { db } from "firebase-app/firebase-config";
import { collection, limit, query } from "firebase/firestore";
import DashboardHeading from "module/Category/DashboardHeading";
import React, { useState } from "react";
import { useEffect } from "react";
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
