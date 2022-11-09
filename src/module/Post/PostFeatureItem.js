import { db } from "firebase-app/firebase-config";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  height: 169px;
  .post {
    &-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(
        179.77deg,
        #6b6b6b 36.45%,
        rgba(163, 163, 163, 0.622265) 63.98%,
        rgba(255, 255, 255, 0) 99.8%
      );
      mix-blend-mode: multiply;
      opacity: 0.5;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }
  @media screen and (min-width: 1024px) {
    height: 272px;
  }
`;
const PostFeatureItem = ({ item }) => {
  const [categories, setCategories] = useState([]);
  const [author, setAuthor] = useState([]);
  console.log(item);
  useEffect(() => {
    async function getCategories() {
      const docRef = doc(db, "categories", item.categoryId);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      setCategories(docSnap.data());
    }
    getCategories();
  }, [item.categoryId]);
  useEffect(() => {
    async function getAuthor() {
      const docRef = doc(db, "users", item.userId);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      setAuthor(docSnap.data());
    }
    getAuthor();
  }, [item.userId]);
  if (!item || !item.id) return null;
  return (
    <PostFeatureItemStyles>
      <PostImage src={item.imageURL} alt="Post-Image"></PostImage>
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          {categories?.name && (
            <PostCategory kind="secondary">{categories.name}</PostCategory>
          )}
          <PostMeta username={author?.username}></PostMeta>
        </div>
        <PostTitle size="semi-normal">{item.title}</PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
