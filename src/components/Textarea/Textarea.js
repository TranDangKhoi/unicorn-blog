import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
import PropTypes from "prop-types";

const TextareaStyles = styled.div`
  position: relative;
  width: 100%;
  textarea {
    user-select: none;
    font-weight: 500;
    padding: ${(props) =>
      props.hasIcon ? "15px 60px 15px 25px" : "15px 25px"};
    background: ${(props) => props.theme.grayLight};
    width: 100%;
    border-radius: 8px;
    transition: all 150ms ease-in-out;
    border: 2px solid transparent;
    resize: none;
    min-height: 300px;
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
`;
const Textarea = ({
  name = "",
  type = "text",
  children,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <TextareaStyles hasIcon={children ? true : false}>
      <textarea type={type} id={name} {...field} {...props} />
    </TextareaStyles>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  children: PropTypes.node,
  control: PropTypes.object.isRequired,
};

export default Textarea;
