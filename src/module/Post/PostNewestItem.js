import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ccc;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .post {
    &-image {
      display: block;
      flex-shrink: 0;
      width: 180px;
      height: 130px;
      border-radius: 12px;
    }
    &-category {
      margin-bottom: 8px;
    }

    &-title {
      margin-bottom: 8px;
    }
  }
`;
const PostNewestItem = () => {
  return (
    <PostNewestItemStyles>
      <PostImage
        src="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80"
        alt="Image"
      ></PostImage>
      <div className="post-content">
        <PostCategory kind="primary">Relaxing</PostCategory>
        <PostTitle size="small">10 lofi playlists to listen at night</PostTitle>
        {/* <h3 className="post-title">10 lofi playlists to listen at night</h3> */}
        <PostMeta></PostMeta>
      </div>
    </PostNewestItemStyles>
  );
};

export default PostNewestItem;
