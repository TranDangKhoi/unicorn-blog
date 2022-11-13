import { ActionDelete, ActionEdit, ActionView } from "components/Action";
import { LabelRole, LabelStatus } from "components/Label";
import { Table } from "components/Table";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import useTableDisplay from "hooks/useTableDisplay";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userRole, userStatus } from "utils/constants";

const UserTable = () => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  const { displayLocalTimeAndDateBySeconds, displayTruncatedID } =
    useTableDisplay();
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      const results = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList(results);
    });
  }, []);

  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="approved">Active</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type="pending">Pending</LabelStatus>;
      case userStatus.BANNED:
        return <LabelStatus type="reject">Banned</LabelStatus>;
      default:
        break;
    }
  };
  const renderUserRole = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return (
          <LabelRole type="admin">
            Admin<i class="fa-solid fa-crown"></i>
          </LabelRole>
        );
      case userRole.MOD:
        return (
          <LabelRole type="mod">
            Mod <i class="fa-solid fa-user-tie"></i>
          </LabelRole>
        );
      case userRole.USER:
        return (
          <LabelRole type="user">
            User <i class="fa-solid fa-user"></i>
          </LabelRole>
        );
      default:
        break;
    }
  };
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Created at</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 &&
            userList.map((user) => (
              <tr>
                <td title={user.id}>{displayTruncatedID(user.userId, 8)}</td>
                <td>
                  <a href={user.avatar} target="_blank" rel="noreferrer">
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="flex-shrink-0 w-10 h-10 rounded-lg"
                    />
                  </a>
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{renderLabelStatus(user?.status)}</td>
                <td>
                  {displayLocalTimeAndDateBySeconds(user?.createdAt?.seconds)}
                </td>
                <td>{renderUserRole(user?.role)}</td>
                <td>
                  <div className="flex gap-5 text-gray-400">
                    <ActionView></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-user?id=${user.userId}`)
                      }
                    ></ActionEdit>
                    <ActionDelete></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
