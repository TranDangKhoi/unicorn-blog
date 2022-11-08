import { DropdownProvider } from "contexts/dropdown-context";
import React, { useState } from "react";

const Dropdown = ({
  placeholder = "Please select an category",
  children,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const handleToggleDropdown = () => {
    setShow(!show);
  };
  return (
    <DropdownProvider {...props}>
      <div className="relative inline-block w-full">
        <div
          className="flex items-center justify-between p-5 bg-[#E7ECF3] rounded cursor-pointer font-medium"
          onClick={handleToggleDropdown}
        >
          <span>{placeholder}</span>
          <span>
            {show ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </span>
        </div>
        {show && (
          <div className="absolute left-0 w-full bg-white shadow-sm top-full">
            {children}
          </div>
        )}
      </div>
    </DropdownProvider>
  );
};

export default Dropdown;
