import { Button } from "components/Button";
import { useAuth } from "contexts/auth-context";
import React from "react";
import styled from "styled-components";
import Banner from "assets/images/banner-img.png";
const HomeBannerStyles = styled.div`
  min-height: 520px;
  padding: 40px 0;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  margin-bottom: 60px;
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-content {
      max-width: 600px;
      color: white;
    }
    &-heading {
      font-size: 36px;
      margin-bottom: 20px;
      font-weight: bold;
    }
    &-desc {
      line-height: 1.75;
      margin-bottom: 40px;
    }
  }
  @media screen and (max-width: 1023.98px) {
    .banner {
      flex-direction: column;
      min-height: unset;
      &-heading {
        font-size: 30px;
        margin-bottom: 10px;
      }
      &-desc {
        font-size: 14px;
        margin-bottom: 20px;
      }
      &-image {
        margin-top: 25px;
      }
      &-button {
        font-size: 14px;
        height: auto;
        padding: 15px;
      }
    }
  }
`;

const HomeBanner = () => {
  const { userInfo } = useAuth();
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">Unicorn Blog</h1>
            <p className="banner-desc">
              Share your story: a blog allows you to have a voice and be heard
              so you may share your story with the entire world, one of the most
              common ways blogs are used are as a diary where the blogger writes
              about their daily experiences so that friends, family, and others
              can all be a part of their lives.
            </p>
            <Button
              to={`${userInfo?.email ? "/dashboard" : "/sign-in"}`}
              kind="secondary"
              className="banner-button"
            >
              Get started
            </Button>
          </div>
          <div className="banner-image">
            <img srcSet={Banner} alt="banner" />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
