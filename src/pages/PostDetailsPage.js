import { Layout } from "components/Layout";
import { db } from "firebase-app/firebase-config";
import parse from "html-react-parser";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import PostCategory from "module/Post/PostCategory";
import PostImage from "module/Post/PostImage";
import PostMeta from "module/Post/PostMeta";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import NotFoundPage from "./NotFoundPage";
import useFormattedDisplay from "hooks/useFormattedDisplay";
import { AuthorBox } from "components/Author";
import PostRelated from "module/Post/PostRelated";
const PostDetailsPageStyles = styled.div`
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    border-radius: 20px;
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
    .author {
      flex-direction: column;
      &-image {
        width: 100%;
        height: auto;
      }
    }
  }
`;

const PostDetailsPage = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});
  const { displayLocaleDateBySeconds } = useFormattedDisplay();
  useEffect(() => {
    async function getPostContent() {
      if (!slug) return;
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          doc.data() && setPostInfo(doc.data());
        });
      });
      console.log(postInfo.content);
    }
    getPostContent();
  }, [postInfo.content, slug]);
  if (!slug) return <NotFoundPage></NotFoundPage>;
  if (!postInfo?.title) return null;
  return (
    <PostDetailsPageStyles>
      <Layout>
        <div className="container">
          <div className="post-header">
            <PostImage
              src={postInfo.imageURL}
              className="post-feature"
            ></PostImage>
            <div className="post-info">
              <PostCategory className="mb-6">
                {postInfo.category.name}
              </PostCategory>
              <h1 className="post-heading">{postInfo.title}</h1>
              <PostMeta
                date={displayLocaleDateBySeconds(postInfo.createdAt.seconds)}
                username={postInfo.user.username}
              ></PostMeta>
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content">{parse(postInfo.content)}</div>
            <AuthorBox userId={postInfo.user.userId}></AuthorBox>
          </div>
          <PostRelated categoryId={postInfo?.categoryId}></PostRelated>
        </div>
      </Layout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
