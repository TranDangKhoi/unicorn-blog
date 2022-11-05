import { useAuth } from "contexts/auth-context";
import React from "react";

const Homepage = () => {
  const { userInfo } = useAuth();
  console.log(userInfo);
  return <div></div>;
};

export default Homepage;
