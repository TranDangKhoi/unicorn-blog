import React from "react";
import styled from "styled-components";

const ValidateStyles = styled.div`
  margin-left: 10px;
  padding-left: 15px;
  position: relative;
  color: ${(props) => props.theme.gray6B};
  &::after {
    content: "";
    position: absolute;
    background: ${(props) => props.theme.gray6B};
    border-radius: 100rem;
    top: 45%;
    left: 0;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
  }
`;
const Validate = ({ children, className }) => {
  return <ValidateStyles>{children}</ValidateStyles>;
};

export default Validate;
