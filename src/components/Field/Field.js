import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
const FieldStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 15px;
  margin-bottom: 40px;
  &:last-child {
    margin-bottom: 0;
  }
`;
const Field = ({ className, children }) => {
  return <FieldStyles className={className}>{children}</FieldStyles>;
};

Field.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Field;
