import { useAuth } from "contexts/auth-context";
import React, { useEffect } from "react";

const Homepage = () => {
  useEffect(() => {
    document.title = "Welcome to Unicorn Blog";
  }, []);
  const { userInfo } = useAuth();
  console.log(userInfo);
  return <div></div>;
};

export default Homepage;
