import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const PostCategoryStyles = styled.div`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 10px;
  color: ${(props) => props.theme.gray6B};
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  ${(props) =>
    props.kind === "primary" &&
    css`
      background: ${(props) => props.theme.grayF3};
    `};
  ${(props) =>
    props.kind === "secondary" &&
    css`
      background-color: ${(props) => props.theme.grayF1}; ;
    `};
  @media screen and (max-width: 1023.98px) {
    font-size: 10px;
  }
`;
const PostCategory = ({
  to = "",
  children,
  kind = "primary",
  className = "",
}) => {
  return (
    <PostCategoryStyles kind={kind} className={`post-category ${className}`}>
      <NavLink to={to}>{children}</NavLink>
    </PostCategoryStyles>
  );
};

PostCategory.propTypes = {
  children: PropTypes.node,
  kind: PropTypes.string,
  className: PropTypes.string,
};

export default PostCategory;
