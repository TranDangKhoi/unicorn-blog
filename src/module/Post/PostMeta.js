import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const PostMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  color: inherit;
  .post {
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
  }
`;
const PostMeta = ({
  date = "Can't display",
  username = "",
  to = "",
  className = "",
}) => {
  return (
    <PostMetaStyles className={className}>
      <span className="post-time">{date}</span>
      <span className="post-dot"></span>
      <NavLink to={to}>
        <span className="post-author">{username}</span>
      </NavLink>
    </PostMetaStyles>
  );
};

export default PostMeta;
