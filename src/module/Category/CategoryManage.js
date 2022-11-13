import useDisplayDateBySeconds from "hooks/useDisplayDateBySeconds";
import Swal from "sweetalert2";
import React from "react";
import DashboardHeading from "./DashboardHeading";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Table } from "components/Table";
import { Label, LabelStatus } from "components/Label";
import { db } from "firebase-app/firebase-config";
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
import { categoryStatus } from "utils/constants";
import { Button } from "components/Button";
import { ActionDelete, ActionEdit } from "components/Action";
import { useNavigate } from "react-router-dom";
import { Field } from "components/Field";
import { debounce } from "lodash";

const CATEGORIES_PER_PAGE = 8;

const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const { displayDateBySeconds } = useDisplayDateBySeconds();
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState();
  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();
  const handleLoadMoreCategories = async () => {
    // Ví dụ lastDoc (category cuối cùng) của page 1 là Gaming thì cái query này sẽ lấy ra tất cả thằng đằng sau thằng Gaming đó để hiển thị ra tiếp
    const nextQuery = query(
      collection(db, "categories"),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc || 0),
      limit(CATEGORIES_PER_PAGE)
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
      setCategoryList([...categoryList, ...results]);
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
    async function getCategories() {
      const colRef = collection(db, "categories");
      const firstQuery = filter
        ? query(
            colRef,
            where("name", ">=", filter),
            where("name", "<=", filter + "utf8"),
            orderBy("createdAt", "desc")
          )
        : query(
            colRef,
            limit(CATEGORIES_PER_PAGE),
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
        setCategoryList(results);
      });
      // Gán cái thằng lastVisible (thằng doc cuối cùng của page hiện tại) kia cho một state là lastDoc để xử lí sau này
      setLastDoc(lastVisible);
    }
    getCategories();
  }, [filter]);

  const handleFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 1000);

  const handleDeleteCategory = async (docId) => {
    try {
      const docToBeDeletedRef = doc(db, "categories", docId);
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

  return (
    <>
      <div className="flex justify-between">
        <DashboardHeading
          title="Categories"
          desc="Manage your category"
        ></DashboardHeading>
        <Button to="/manage/add-category" kind="ghost">
          Create categories
        </Button>
      </div>
      <Field className="my-10">
        <Label>Search for categories here:</Label>
        <input
          type="text"
          placeholder="Search category..."
          className="px-5 py-4 text-[16px] font-semibold border border-gray-300 rounded-lg"
          onChange={handleFilter}
        />
      </Field>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Created at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 &&
            categoryList.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <span className="italic font-normal text-gray-500">
                    /{category.slug}
                  </span>
                </td>
                <td>
                  {category?.status &&
                    category?.status === categoryStatus.APPROVED && (
                      <LabelStatus type="approved">Approved</LabelStatus>
                    )}
                  {category?.status &&
                    category?.status === categoryStatus.PENDING && (
                      <LabelStatus type="pending">Pending</LabelStatus>
                    )}
                  {category?.status &&
                    category?.status === categoryStatus.DISAPPROVED && (
                      <LabelStatus type="disapproved">Disapproved</LabelStatus>
                    )}
                </td>
                <td>{`${new Date(
                  category?.createdAt?.seconds * 1000
                ).toLocaleTimeString("vi-VI")} ${displayDateBySeconds(
                  category?.createdAt?.seconds
                )}`}</td>
                <td>
                  <div className="flex gap-5 text-gray-400">
                    <ActionEdit
                      onClick={() =>
                        navigate(
                          `/manage/update-category?id=${category.id}&name=${category.name}`
                        )
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteCategory(category.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {!isEmpty ? (
        <div className="mt-10">
          <Button onClick={handleLoadMoreCategories}>Load more</Button>
        </div>
      ) : (
        <DashboardHeading
          className="italic text-center"
          desc="The end."
          title="No more data"
        ></DashboardHeading>
      )}
    </>
  );
};

export default CategoryManage;
