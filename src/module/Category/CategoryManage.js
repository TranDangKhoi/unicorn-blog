import useDisplayDateBySeconds from "hooks/useDisplayDateBySeconds";
import Swal from "sweetalert2";
import React from "react";
import DashboardHeading from "./DashboardHeading";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Table } from "components/Table";
import { LabelStatus } from "components/Label";
import { db } from "firebase-app/firebase-config";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { categoryStatus } from "utils/constants";
import { Button } from "components/Button";
import { ActionDelete, ActionEdit, ActionView } from "components/Action";

const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const { displayDateBySeconds } = useDisplayDateBySeconds();
  useEffect(() => {
    const colRef = collection(db, "categories");
    onSnapshot(colRef, (snapshot) => {
      const categories = [];
      snapshot.docs.forEach((doc) => {
        categories.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategoryList(categories);
    });
  }, []);
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
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
      console.log(docToBeDeletedRef);
    } catch (err) {
      toast.error(err.message);
    }
  };
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
                <td>{displayDateBySeconds(category?.createdAt?.seconds)}</td>
                <td>
                  <div className="flex gap-5 text-gray-400">
                    <ActionView></ActionView>
                    <ActionEdit></ActionEdit>
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
