import { db } from "firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const AuthorBox = ({ userId }) => {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    async function getAuthorInfos() {
      const docRef = doc(db, "users", userId);
      const docData = await getDoc(docRef);
      setUserInfo(docData.data());
    }
    getAuthorInfos();
  }, [userId]);
  return (
    <div className="author">
      <div className="author-image">
        <img src={userInfo?.avatar} alt="" />
      </div>
      <div className="author-content">
        <h3 className="author-name">{userInfo?.username}</h3>
        <p className="author-desc line-clamp-5">{userInfo?.bio}</p>
      </div>
    </div>
  );
};

export default AuthorBox;
