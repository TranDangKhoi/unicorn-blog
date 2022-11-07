import { Heading } from "components/Layout";
import PostItem from "module/Post/PostItem";
import PostNewestItem from "module/Post/PostNewestItem";
import PostNewestLarge from "module/Post/PostNewestLarge";
import React from "react";
import styled from "styled-components";

const HomeNewestStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 40px;
    margin-bottom: 64px;
    align-items: start;
  }
  .sidebar {
    padding: 28px 20px;
    background-color: ${(props) => props.theme.grayF1};
    border-radius: 16px;
  }
`;

const HomeNewest = () => {
  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>Most recent</Heading>
        <div className="layout">
          <PostNewestLarge></PostNewestLarge>
          <div className="sidebar">
            <PostNewestItem></PostNewestItem>
            <PostNewestItem></PostNewestItem>
            <PostNewestItem></PostNewestItem>
          </div>
        </div>
        <div className="grid-layout grid-layout--primary">
          <PostItem></PostItem>
          <PostItem></PostItem>
          <PostItem></PostItem>
          <PostItem></PostItem>
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
