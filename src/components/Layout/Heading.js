import React from "react";
import styled from "styled-components";
const HeadingStyles = styled.h2`
  color: ${(props) => props.theme.primary};
  font-size: 28px;
  position: relative;
  font-weight: 700;
  text-transform: uppercase;
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
const Heading = ({ className = "", children }) => {
  return <HeadingStyles className={className}>{children}</HeadingStyles>;
};

export default Heading;
