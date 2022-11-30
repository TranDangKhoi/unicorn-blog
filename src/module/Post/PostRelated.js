import { Heading } from "components/Layout";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import PostItem from "./PostItem";

const PostRelated = ({ postId, categoryId }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const docRef = query(
      collection(db, "posts"),
      where("categoryId", "==", categoryId),
      limit(4)
    );
    onSnapshot(docRef, (snapshot) => {
      const results = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
  }, [categoryId]);
  if (!categoryId || posts.length <= 0) return null;
  return (
    <div className="mb-10 post-related">
      <Heading>Related articles</Heading>
      <div className="grid-layout grid-layout--primary">
        {posts.map((post) => (
          <PostItem key={post.id} post={post}></PostItem>
        ))}
      </div>
    </div>
  );
};

export default PostRelated;
