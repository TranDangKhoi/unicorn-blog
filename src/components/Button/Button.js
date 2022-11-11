import { LoadingSpinner } from "components/Loading";
import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 22px;
  line-height: 1;
  border-radius: 8px;
  ${(props) =>
    props.kind === "primary" &&
    css`
      background-image: linear-gradient(
        to bottom right,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
      color: white;
    `};
  ${(props) =>
    props.kind === "secondary" &&
    css`
      background-color: white;
      color: ${(props) => props.theme.primary};
    `};
  ${(props) =>
    props.kind === "ghost" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: rgba(29, 192, 113, 0.1);
    `};
  ${(props) =>
    props.width === "full" &&
    css`
      width: 100%;
    `};
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
  kind = "primary",
  height = "80px",
  width = "full",
  className = "",
  ...props
}) => {
  const { isLoading, to } = props;
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to}>
        <ButtonStyles
          kind={kind}
          height={height}
          width={width}
          type={type}
          onClick={onClick}
          className={className}
          {...props}
        >
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles
      kind={kind}
      height={height}
      width={width}
      type={type}
      onClick={onClick}
      className={className}
      {...props}
    >
      {child}
    </ButtonStyles>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
  onClick: PropTypes.func,
  kind: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.string,
};

export default Button;
