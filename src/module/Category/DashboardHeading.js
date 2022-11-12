import React from "react";

const DashboardHeading = ({ title = "", desc = "" }) => {
  return (
    <div className="">
      <div>
        <h1 className="dashboard-heading">{title}</h1>
        <p className="dashboard-short-desc">{desc}</p>
      </div>
    </div>
  );
};

export default DashboardHeading;
