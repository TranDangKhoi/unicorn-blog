import { ActionDelete, ActionEdit, ActionView } from "components/Action";
import { Button } from "components/Button";
import { LabelStatus } from "components/Label";
import { Heading } from "components/Layout";
import { Table } from "components/Table";
import { useAuth } from "contexts/auth-context";
import { auth, db } from "firebase-app/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import useFormattedDisplay from "hooks/useFormattedDisplay";
import { debounce, first } from "lodash";
import DashboardHeading from "module/Category/DashboardHeading";
import NotFoundPage from "pages/NotFoundPage";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { postStatus, userRole } from "utils/constants";
const POSTS_PER_PAGE = 8;
const PostManage = () => {
  const { userInfo } = useAuth();
  const [postList, setPostList] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState({});
  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();
  const { displayLocalTimeAndDateBySeconds, displayTruncatedID } =
    useFormattedDisplay();
  const handleLoadMorePosts = async () => {
    // Ví dụ lastDoc (category cuối cùng) của page 1 là Gaming thì cái query này sẽ lấy ra tất cả thằng đằng sau thằng Gaming đó để hiển thị ra tiếp
    const nextQuery = query(
      collection(db, "posts"),
      orderBy("name", "desc"),
      startAfter(lastDoc || 0),
      limit(POSTS_PER_PAGE)
    );
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
    const documentSnapshots = await getDocs(nextQuery);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  useEffect(() => {
    async function getPosts() {
      const colRef = collection(db, "posts");
      if (userInfo.role !== userRole.ADMIN && userInfo.role !== userRole.MOD) {
        const firstQuery = filter
          ? query(
              colRef,
              where("name", ">=", filter),
              where("name", "<=", filter + "utf8"),
              where("userId", "==", auth.currentUser.uid),
              orderBy("name", "desc")
            )
          : query(
              colRef,
              limit(POSTS_PER_PAGE),
              where("userId", "==", userInfo.uid),
              orderBy("createdAt", "desc")
            );
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
          setPostList(results);
        });
        // Gán cái thằng lastVisible (thằng doc cuối cùng của page hiện tại) kia cho một state là lastDoc để xử lí sau này
        setLastDoc(lastVisible);
      } else {
        const firstQuery = filter
          ? query(
              colRef,
              where("name", ">=", filter),
              where("name", "<=", filter + "utf8"),
              orderBy("name", "desc")
            )
          : query(colRef, limit(POSTS_PER_PAGE), orderBy("createdAt", "desc"));
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
          setPostList(results);
        });
        // Gán cái thằng lastVisible (thằng doc cuối cùng của page hiện tại) kia cho một state là lastDoc để xử lí sau này
        setLastDoc(lastVisible);
      }
    }
    getPosts();
  }, [filter, userInfo.role, userInfo.uid]);

  const handleFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 1000);

  const handleDeletePost = async (docId) => {
    try {
      const docToBeDeletedRef = doc(db, "posts", docId);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1DC071",
        cancelButtonColor: "#d33",
        cancelButtonText: "NO STOP!",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteDoc(docToBeDeletedRef);
          setFilter("");
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (err) {
      toast.error(err.message);
    }
  };
  const renderLabelStatus = (status) => {
    switch (status) {
      case postStatus.APPROVED:
        return <LabelStatus type="approved">Active</LabelStatus>;
      case postStatus.PENDING:
        return <LabelStatus type="pending">Pending</LabelStatus>;
      case postStatus.REJECTED:
        return <LabelStatus type="reject">Rejected</LabelStatus>;
      default:
        break;
    }
  };
  return (
    <div>
      <Heading>Manage posts</Heading>
      <div className="flex justify-end mb-10">
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            className="w-full p-4 border border-gray-300 border-solid rounded-lg"
            placeholder="Search post..."
            onChange={handleFilter}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Thumbnail</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postList.length > 0 &&
            postList.map((post) => (
              <tr key={post.id}>
                <td title={post.id}>{displayTruncatedID(post?.id, 8)}</td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <img
                      src={post.imageURL}
                      alt=""
                      className="w-[100px] h-[75px] rounded-lg object-cover"
                    />
                  </div>
                </td>
                <td className="!text-left">
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="font-semibold max-w-[300px] whitespace-pre-wrap line-clamp-2">
                      {post.title}
                    </h3>
                    <time className="text-sm text-gray-500">
                      Posted at:{" "}
                      {displayLocalTimeAndDateBySeconds(post.createdAt.seconds)}
                    </time>
                  </div>
                </td>
                <td>
                  <span className="text-gray-500">{post.category.name}</span>
                </td>
                <td>
                  <span className="text-gray-500">{post.user.username}</span>
                </td>
                <td>{renderLabelStatus(post.status)}</td>
                <td>
                  <div className="flex items-center text-gray-500 gap-x-3">
                    <ActionView
                      onClick={() => navigate(`/${post.slug}`)}
                    ></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-post?id=${post.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeletePost(post.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {!isEmpty ? (
        <div className="mt-10">
          <Button onClick={handleLoadMorePosts}>Load more</Button>
        </div>
      ) : (
        <DashboardHeading
          className="italic text-center"
          desc="The end."
          title="No more data"
        ></DashboardHeading>
      )}
    </div>
  );
};

export default PostManage;
