import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
import PropTypes from "prop-types";

const InputStyles = styled.div`
  position: relative;
  width: 100%;
  input {
    user-select: none;
    font-weight: 500;
    padding: ${(props) => (props.hasIcon ? "20px 60px 20px 20px" : "20px")};
    background: ${(props) => props.theme.grayLight};
    width: 100%;
    border-radius: 8px;
    transition: all 150ms ease-in-out;
    border: 2px solid transparent;
    &:focus {
      background-size: white;
      border-color: ${(props) => props.theme.primary};
    }
    &::placeholder {
      color: #84878b;
    }
    &::-webkit-input-placeholder {
      color: #84878b;
    }
    &::-moz-input-placeholder {
      color: #84878b;
    }
  }
  .input-icon {
    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;
const Input = ({
  name = "",
  type = "text",
  children,
  hasIcon = false,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    // Truyền props hasIcon vào đây để có thể sử dụng props này trong styled-components
    <InputStyles hasIcon={children ? true : false}>
      <input type={type} id={name} {...field} {...props} />
      {children ? <div className="input-icon">{children}</div> : <></>}
    </InputStyles>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  children: PropTypes.node,
  hasIcon: PropTypes.bool,
  control: PropTypes.object.isRequired,
};

export default Input;
