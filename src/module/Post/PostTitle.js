import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
const PostTitleStyles = styled.h3`
  font-weight: 700;
  line-height: 1.5;
  display: block;
  ${(props) =>
    props.size === "small" &&
    css`
      font-size: 16px;
    `};
  ${(props) =>
    props.size === "normal" &&
    css`
      font-size: 18px;
    `};
  ${(props) =>
    props.size === "semi-normal" &&
    css`
      font-size: 20px;
    `};
  ${(props) =>
    props.size === "big" &&
    css`
      font-size: 22px;
    `};
`;
const PostTitle = ({ to = "", children, className = "", size = "normal" }) => {
  return (
    <PostTitleStyles size={size} className={`post-title ${className}`}>
      <Link to={`/${to}`}>{children}</Link>
    </PostTitleStyles>
  );
};

export default PostTitle;
