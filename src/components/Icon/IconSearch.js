import React from "react";
import PropTypes from "prop-types";
const IconSearch = ({ className, onClick = () => {} }) => {
  return (
    <span className={className} onClick={onClick}>
      <i class="fa-solid fa-magnifying-glass"></i>
    </span>
  );
};
IconSearch.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};
export default IconSearch;
