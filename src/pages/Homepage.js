import { useAuth } from "contexts/auth-context";
import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import React, { useEffect } from "react";

const Homepage = () => {
  const handleSignOut = () => {
    signOut(auth);
  };
  const { userInfo } = useAuth();
  console.log(userInfo);
  return (
    <div>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

export default Homepage;
