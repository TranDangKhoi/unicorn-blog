import { db } from "firebase-app/firebase-config";
import { collection, limit, query } from "firebase/firestore";
import DashboardHeading from "module/Category/DashboardHeading";
import React, { useState } from "react";
import { useEffect } from "react";
import UserTable from "./UserTable";

const UserManage = () => {
  return (
    <div>
      <DashboardHeading
        title="Users"
        desc="Manage your user"
      ></DashboardHeading>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;
