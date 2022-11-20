import useFormattedDisplay from "hooks/useFormattedDisplay";
import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 20px;
    }
  }
  @media screen and (max-width: 1023.98px) {
    .post {
      &-image {
        aspect-ratio: 16/9;
        height: auto;
      }
    }
  }
`;

const PostItem = ({ post }) => {
  const { displayLocaleDateBySeconds } = useFormattedDisplay();
  return (
    <PostItemStyles>
      <PostImage src={post.imageURL} alt={post.slug}></PostImage>
      <PostCategory to={post.category.slug}>{post.category.name}</PostCategory>
      <PostTitle to={post.slug}>{post.title}</PostTitle>
      <PostMeta
        date={displayLocaleDateBySeconds(post.createdAt.seconds)}
        username={post.user.username}
      ></PostMeta>
    </PostItemStyles>
  );
};

export default PostItem;
