import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

import { db } from "firebase-app/firebase-config";

import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import useFormattedDisplay from "hooks/useFormattedDisplay";

const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 20px;
      height: 433px;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 20px;
    }
    @media screen and (max-width: 1023.98px) {
      &-image {
        height: 250px;
      }
    }
  }
`;

const PostNewestLarge = () => {
  const [newestPost, setNewestPost] = useState({});
  const { displayLocaleDateBySeconds } = useFormattedDisplay();
  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(colRef, limit(1), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const results = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setNewestPost(results[0]);
    });
  }, []);
  const { category, user } = newestPost || [];
  if (!category || !user) return null;
  return (
    <PostNewestLargeStyles>
      <PostImage src={newestPost?.imageURL} alt="Image" to="/"></PostImage>
      <PostCategory kind="secondary" to={newestPost.category.slug}>
        {category?.name}
      </PostCategory>
      <PostTitle to={newestPost?.slug} size="big">
        {newestPost?.title}
      </PostTitle>
      <PostMeta
        date={displayLocaleDateBySeconds(newestPost?.createdAt?.seconds)}
        username={user?.username}
      ></PostMeta>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
