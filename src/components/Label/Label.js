import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const LabelStyles = styled.label`
  color: ${(props) => props.theme.grayDark};
  font-weight: 600;
  cursor: pointer;
  position: relative;
  ${(props) =>
    props.required === true &&
    css`
      &::after {
        content: "*";
        position: absolute;
        top: 0;
        right: 0;
        transform: translateX(12px);
        color: red;
        font-size: 20px;
      }
    `};
`;

const Label = ({
  htmlFor = "",
  required = false,
  className = "",
  children,
  ...props
}) => {
  return (
    <LabelStyles htmlFor={htmlFor} required={required} {...props}>
      {children}
    </LabelStyles>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.node,
};

export default Label;
