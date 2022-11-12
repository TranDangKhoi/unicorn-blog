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
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { categoryStatus } from "utils/constants";
import { Button } from "components/Button";
import { ActionDelete, ActionEdit } from "components/Action";
import { useNavigate } from "react-router-dom";
import { Field } from "components/Field";
import { debounce } from "lodash";

const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const { displayDateBySeconds } = useDisplayDateBySeconds();
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "categories");
    const q = filter
      ? query(
          colRef,
          where("name", ">=", filter),
          where("name", "<=", filter + "utf8")
        )
      : colRef;

    onSnapshot(q, colRef, (snapshot) => {
      const categories = [];
      snapshot.docs.forEach((doc) => {
        categories.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategoryList(categories);
    });
  }, [filter]);
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
  const handleFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 1000);
  return (
    <>
      <div className="flex justify-between db-heading-layout">
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
    </>
  );
};

export default CategoryManage;
