import { useAuth } from "contexts/auth-context";
import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import styled from "styled-components";
const HomepageStyles = styled.div``;
const Homepage = () => {
  const handleSignOut = () => {
    signOut(auth);
  };
  useEffect(() => {
    document.title = "Welcome to Unicorn Blog";
  }, []);
  const { userInfo } = useAuth();
  console.log(userInfo);
  return <HomepageStyles></HomepageStyles>;
};

export default Homepage;
