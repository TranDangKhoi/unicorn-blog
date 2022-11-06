import { LoadingSpinner } from "components/Loading";
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";

const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 22px;
  line-height: 1;
  color: white;
  border-radius: 8px;
  background-image: linear-gradient(
    to bottom right,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  width: 100%;
  height: ${(props) => props.height};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }
`;
/**
 * @requires
 * @param {string} type Type of button: "button" || "submit"
 * @param {onClick} onClick Type of onSubmit: function
 * @returns
 */
const Button = ({
  type = "button",
  onClick = () => {},
  children,
  height = "80px",
  ...props
}) => {
  const { isLoading, to } = props;
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to}>
        <ButtonStyles height={height} type={type} onClick={onClick} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles height={height} type={type} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  height: PropTypes.string,
};

export default Button;
