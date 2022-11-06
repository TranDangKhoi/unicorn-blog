import { Layout } from "components/Layout";
import { useAuth } from "contexts/auth-context";
import HomeBanner from "module/Home/HomeBanner";
import HomeFeature from "module/Home/HomeFeature";
import HomeNewest from "module/Home/HomeNewest";
import React, { useEffect } from "react";
import styled from "styled-components";
const HomepageStyles = styled.div``;
const Homepage = () => {
  useEffect(() => {
    document.title = "Welcome to Unicorn Blog";
  }, []);
  const { userInfo } = useAuth();
  console.log(userInfo);
  return (
    <HomepageStyles>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <HomeNewest></HomeNewest>
      </Layout>
    </HomepageStyles>
  );
};

export default Homepage;
