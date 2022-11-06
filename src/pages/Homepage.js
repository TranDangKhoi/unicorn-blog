import { Layout } from "components/Layout";
import { useAuth } from "contexts/auth-context";
import HomeBanner from "module/Home/HomeBanner";
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
      </Layout>
    </HomepageStyles>
  );
};

export default Homepage;
