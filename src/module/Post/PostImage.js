import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const PostImageStyles = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }
`;
const PostImage = ({ to = "", className = "", src = "", alt = "" }) => {
  if (to && to !== "")
    return (
      <NavLink
        to={to}
        style={{
          display: "block",
        }}
      >
        <PostImageStyles className={`post-image ${className}`}>
          <img src={src} alt={alt} loading="lazy" />
        </PostImageStyles>
      </NavLink>
    );
  return (
    <PostImageStyles className={`post-image ${className}`}>
      <img src={src} alt={alt} loading="lazy" />
    </PostImageStyles>
  );
};

export default PostImage;
