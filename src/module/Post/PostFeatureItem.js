import useFormattedDisplay from "hooks/useFormattedDisplay";
import { useNavigate } from "react-router-dom";
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
  @media screen and (max-width: 1023.98px) {
    height: 200px;

    .post {
      &-time {
        font-size: 12px;
      }
      &-author {
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: 12px;
      }
    }
  }
`;
const PostFeatureItem = ({ post }) => {
  const { displayLocaleDateBySeconds } = useFormattedDisplay();
  const navigate = useNavigate();
  if (!post || !post.id) return null;
  return (
    <PostFeatureItemStyles>
      <PostImage src={post.imageURL} alt="Post-Image"></PostImage>
      <div className="z-10 post-overlay"></div>
      <div className="post-content" onClick={() => navigate(`/${post.slug}`)}>
        <div className="post-top">
          {post?.category?.name && (
            <PostCategory kind="secondary" to={post?.category?.slug}>
              {post?.category?.name}
            </PostCategory>
          )}
          <PostMeta
            to={post?.user?.usernameSlug}
            username={post?.user?.username}
            date={displayLocaleDateBySeconds(post?.createdAt?.seconds)}
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
