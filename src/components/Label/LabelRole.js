import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LabelRoleStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  width: 100px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  i {
    margin-left: 5px;
  }
`;
/**
 *
 * @param type - "default" "admin" "mod" "user"
 * @returns
 */
const LabelRole = ({ children, type = "default" }) => {
  let styleClassName = "text-gray-500 bg-gray-100";
  switch (type) {
    case "admin":
      styleClassName = "text-yellow-600 bg-yellow-200";
      break;
    case "mod":
      styleClassName = "text-blue-500 bg-blue-200";
      break;
    case "user":
      styleClassName = "text-gray-500 bg-gray-200";
      break;

    default:
      break;
  }
  return (
    <LabelRoleStyles className={styleClassName}>{children}</LabelRoleStyles>
  );
};

LabelRole.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(["default", "admin", "mod", "user"]).isRequired,
};

export default LabelRole;
