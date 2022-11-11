import { ActionDelete, ActionEdit, ActionView } from "components/Action";
import { Button } from "components/Button";
import { LabelStatus } from "components/Label";
import { Table } from "components/Table";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { categoryStatus, postStatus } from "utils/constants";
import DashboardHeading from "./DashboardHeading";

const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([]);
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
                <td>11/11/2022</td>
                <td>
                  <div className="flex gap-5 text-gray-400">
                    <ActionView></ActionView>
                    <ActionEdit></ActionEdit>
                    <ActionDelete></ActionDelete>
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
