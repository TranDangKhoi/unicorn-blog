import styled from "styled-components";
import React from "react";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import PostCategory from "./PostCategory";
import { useState } from "react";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import useDisplayDateBySeconds from "hooks/useTableDisplay";
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
const PostFeatureItem = ({ post }) => {
  const [categories, setCategories] = useState([]);
  const [author, setAuthor] = useState([]);
  const { displayDateBySeconds } = useDisplayDateBySeconds();
  useEffect(() => {
    async function getCategories() {
      const docRef = doc(db, "categories", post.categoryId);
      const docSnap = await getDoc(docRef);
      setCategories(docSnap.data());
    }
    getCategories();
  }, [post.categoryId]);
  useEffect(() => {
    async function getAuthor() {
      const docRef = doc(db, "users", post.userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.data) {
        setAuthor(docSnap.data());
      }
    }
    getAuthor();
  }, [post.userId]);
  const formattedDate = displayDateBySeconds(post?.createdAt?.seconds);
  if (!post || !post.id) return null;
  return (
    <PostFeatureItemStyles>
      <PostImage src={post.imageURL} alt="Post-Image"></PostImage>
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          {categories?.name && (
            <PostCategory kind="secondary" to={categories.slug}>
              {categories.name}
            </PostCategory>
          )}
          <PostMeta
            to={author?.usernameSlug}
            username={author?.username}
            date={formattedDate}
          ></PostMeta>
        </div>
        <PostTitle to={post.slug} size="semi-normal">
          {post.title}
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
