import { useDropdown } from "contexts/dropdown-context";
import React from "react";

const Search = ({ placeholder, ...props }) => {
  const { onChange } = useDropdown();
  return (
    <div className="p-2">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full p-4 border border-gray-200 rounded outline-none"
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default Search;
