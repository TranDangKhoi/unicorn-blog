import { Button } from "components/Button";
import React from "react";
import styled from "styled-components";
const HomeBannerStyles = styled.div`
  margin-bottom: 50px;
  min-height: 520px;
  padding: 40px 0;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-heading {
      font-size: 36px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    &-content {
      max-width: 400px;
      color: white;
    }
    &-desc {
      line-height: 1.4;
      margin-bottom: 40px;
    }
  }
`;
const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">Unicorn Blog</h1>
            <p className="banner-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              assumenda similique qui rerum? Ex maiores eveniet omnis ipsam
              inventore! Doloremque eum recusandae aliquid dolorem. Dicta magni
              obcaecati totam aperiam odit!
            </p>
            <Button kind="secondary" to={"/sign-in"}>
              Get started
            </Button>
          </div>
          <div className="banner-image">
            <img srcSet="/banner-img.png" alt="Banner" />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
