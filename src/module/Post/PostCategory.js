import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const PostCategoryStyles = styled.div`
  display: inline-block;
  padding: 8px;
  border-radius: 8px;
  color: ${(props) => props.theme.gray6B};
  font-size: 14px;
  font-weight: 600;
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
