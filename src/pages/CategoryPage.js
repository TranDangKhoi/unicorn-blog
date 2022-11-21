import { Heading, Layout } from "components/Layout";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import PostItem from "module/Post/PostItem";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
const ARTICLES_PER_PAGE = 12;
const CategoryPage = () => {
  const { slug } = useParams();
  const [postList, setPostList] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [isEmpty, setIsEmpty] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();
  const handleLoadMorePosts = async () => {
    // Ví dụ lastDoc (category cuối cùng) của page 1 là Gaming thì cái query này sẽ lấy ra tất cả thằng đằng sau thằng Gaming đó để hiển thị ra tiếp
    const nextQuery = query(
      collection(db, "posts"),
      //   orderBy("name", "desc"),
      startAfter(lastDoc || 0),
      limit(ARTICLES_PER_PAGE)
    );
    // Nhét query vào đây và setCategoryList là thông tin của page trước concat với page mới
    onSnapshot(nextQuery, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      const isCollectionEmpty = snapshot.size === 0;
      setIsEmpty(isCollectionEmpty);
      setPostList([...postList, ...results]);
    });
    // Ok giờ, lấy ra tất cả docs của page mới
    const documentSnapshots = await getDocs(nextQuery);
    // Lấy doc cuối cùng của page mới
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    // set cho state lastDoc = thông tin của thằng doc cuối cùng của page mới đó, rồi lại quay trở lại chạy vào useEffect
    setLastDoc(lastVisible);
  };
  useEffect(() => {
    async function getPosts() {
      const colRef = collection(db, "posts");
      const firstQuery = slug
        ? query(colRef, where("category.slug", "==", slug))
        : query(colRef, limit(ARTICLES_PER_PAGE));
      // Lấy ra toàn bộ docs
      const documentSnapshots = await getDocs(firstQuery);
      // Lấy ra thông tin của doc cuối cùng CỦA PAGE HIỆN TẠI
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      //  Hiển thị các docs lấy được ra màn hình
      onSnapshot(firstQuery, colRef, (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCategoryName(slug);
        setPostList(results);
      });
      // Gán cái thằng lastVisible (thằng doc cuối cùng của page hiện tại) kia cho một state là lastDoc để xử lí sau này
      setLastDoc(lastVisible);
    }
    getPosts();
  }, [slug]);
  if (!slug) return <NotFoundPage></NotFoundPage>;
  return (
    <Layout>
      <div className="container">
        <Heading className="mt-10">Articles with category: {categoryName}</Heading>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4">
          {postList.length > 0 &&
            postList.map((post) => (
              <PostItem key={post?.id} post={post}></PostItem>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
