import React from "react";

const DashboardHeading = ({ className = "", title = "", desc = "" }) => {
  return (
    <div className={className}>
      <div>
        <h1 className="dashboard-heading">{title}</h1>
        <p className="dashboard-short-desc">{desc}</p>
      </div>
    </div>
  );
};

export default DashboardHeading;
