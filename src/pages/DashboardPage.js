import DashboardHeading from "module/Category/DashboardHeading";
import React from "react";
import { useEffect } from "react";

const DashboardPage = () => {
  useEffect(() => {
    document.title = "Welcome to your dashboard";
  }, []);
  return (
    <div>
      <DashboardHeading
        title="Dashboard"
        desc="Overview dashboard monitor"
      ></DashboardHeading>
    </div>
  );
};

export default DashboardPage;
