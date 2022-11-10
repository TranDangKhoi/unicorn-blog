import { useDropdown } from "contexts/dropdown-context";
import React from "react";

const Option = (props) => {
  const { onClick } = props;
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      className="py-[15px] px-[25px] transition-all border-l-4 border-l-transparent cursor-pointer flex items-center justify-between hover:text-primary hover:border-l-primary"
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export default Option;
