import { Heading } from "components/Layout";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import PostItem from "module/Post/PostItem";
import PostNewestItem from "module/Post/PostNewestItem";
import PostNewestLarge from "module/Post/PostNewestLarge";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
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
  @media screen and (max-width: 1023.98px) {
    .layout {
      grid-template-columns: 100%;
    }
    .sidebar {
      padding: 14px 10px;
    }
  }
`;

const HomeNewest = () => {
  const [newestPostList, setNewestPostList] = useState({});
  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(colRef, limit(4), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const results = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      results.shift();
      setNewestPostList(results);
    });
  }, []);
  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>Most recent</Heading>
        <div className="layout">
          <PostNewestLarge></PostNewestLarge>
          <div className="sidebar">
            {newestPostList.length > 0 &&
              newestPostList.map((post) => (
                <PostNewestItem key={post.id} post={post}></PostNewestItem>
              ))}
          </div>
        </div>
        <div className="grid-layout grid-layout--primary"></div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
