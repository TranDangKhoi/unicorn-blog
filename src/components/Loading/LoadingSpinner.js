import React from "react";
import styled from "styled-components";
const LoadingSpinnerStyles = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border: ${(props) => props.borderSize} solid ${(props) => props.borderColor};
  border-top: ${(props) => props.borderSize} solid transparent;
  border-bottom: ${(props) => props.borderSize} solid transparent;
  border-radius: 100rem;
  display: inline-block;
  animation: spin 1.5s infinite linear;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
const LoadingSpinner = ({
  size = "40px",
  borderColor = "white",
  borderSize = "5px",
  ...props
}) => {
  return (
    <LoadingSpinnerStyles
      size={size}
      borderSize={borderSize}
      borderColor={borderColor}
      {...props}
    ></LoadingSpinnerStyles>
  );
};

export default LoadingSpinner;
