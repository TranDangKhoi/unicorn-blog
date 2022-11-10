import { Heading } from "components/Layout";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import PostFeatureItem from "module/Post/PostFeatureItem";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
const HomeFeatureStyles = styled.div``;

const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(
      colRef,
      where("status", "==", 1),
      where("popular", "==", true),
      limit(3)
    );
    onSnapshot(q, (snapshot) => {
      let featuredPost = [];
      snapshot.docs.forEach((doc) => {
        featuredPost.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(featuredPost);
    });
  }, []);
  if (posts.length <= 0) return null;
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Featured</Heading>
        <div className="grid-layout">
          {posts.map((post) => (
            <PostFeatureItem key={post.id} post={post}></PostFeatureItem>
          ))}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
