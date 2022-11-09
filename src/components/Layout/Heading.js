import React from "react";
import styled, { css } from "styled-components";
const HeadingStyles = styled.h2`
  color: ${(props) => props.theme.primary};
  font-size: 28px;
  position: relative;
  font-weight: 700;
  ${(props) =>
    props.uppercase === true &&
    css`
      text-transform: uppercase;
    `};
  text-transform: ${(props) =>
    props.uppercase === false &&
    css`
      text-transform: none;
    `};
  margin-bottom: 20px;
  display: inline-block;
  &::before {
    content: "";
    position: absolute;
    width: 50px;
    height: 4px;
    top: 100%;
    left: 0;
    background-color: ${(props) => props.theme.primary};
  }
`;
const Heading = ({ className = "", uppercase = true, children }) => {
  return (
    <HeadingStyles className={className} uppercase={uppercase}>
      {children}
    </HeadingStyles>
  );
};

export default Heading;
