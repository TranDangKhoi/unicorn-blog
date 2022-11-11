import React from "react";

const FieldCheckbox = ({ children, className = "" }) => {
  return <div className={`flex flex-wrap gap-5 ${className}`}>{children}</div>;
};

export default FieldCheckbox;
