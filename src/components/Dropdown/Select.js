import { IconArrowDown, IconArrowUp } from "components/Icon";
import { useDropdown } from "contexts/dropdown-context";
import React from "react";

const Select = ({
  placeholder = "Please select an category",
  className = "",
}) => {
  const { show, handleToggleDropdown } = useDropdown();
  return (
    <div
      className={`${className} py-[15px] rounded-lg border border-gray-200 px-[25px] cursor-pointer flex items-center justify-between`}
      onClick={handleToggleDropdown}
    >
      <span>{placeholder}</span>
      <span>
        {show ? <IconArrowUp></IconArrowUp> : <IconArrowDown></IconArrowDown>}
      </span>
    </div>
  );
};

export default Select;
