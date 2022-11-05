import { LoadingSpinner } from "components/Loading";
import React from "react";
import styled from "styled-components";
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
const Button = ({
  type = "button",
  onClick = () => {},
  children,
  height = "80px",
  ...props
}) => {
  const { isLoading } = props;
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  return (
    <ButtonStyles height={height} type={type} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};

export default Button;
