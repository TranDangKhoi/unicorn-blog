import { ActionDelete, ActionEdit, ActionView } from "components/Action";
import { Button } from "components/Button";
import { Field } from "components/Field";
import { Label, LabelRole, LabelStatus } from "components/Label";
import { Table } from "components/Table";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  deleteDoc,
  doc,
  where,
} from "firebase/firestore";
import useTableDisplay from "hooks/useTableDisplay";
import { debounce } from "lodash";
import DashboardHeading from "module/Category/DashboardHeading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { userRole, userStatus } from "utils/constants";
const USERS_PER_PAGE = 8;

const UserTable = () => {
  const [userList, setUserList] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [filter, setFilter] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const handleFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 1000);
  const handleLoadMoreUsers = async () => {
    const nextQuery = query(
      collection(db, "users"),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc || 0),
      limit(USERS_PER_PAGE)
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
      setUserList([...userList, ...results]);
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
    async function getUsers() {
      const colRef = collection(db, "users");
      const firstQuery = filter
        ? query(
            colRef,
            where("username", ">=", filter),
            where("username", "<=", filter + "utf8"),
            orderBy("username", "desc")
          )
        : query(colRef, limit(USERS_PER_PAGE), orderBy("createdAt", "desc"));
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
        setUserList(results);
      });
      // Gán cái thằng lastVisible (thằng doc cuối cùng của page hiện tại) kia cho một state là lastDoc để xử lí sau này
      setLastDoc(lastVisible);
    }
    getUsers();
  }, [filter]);
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
  const handleDeleteUser = async (user) => {
    const colRef = doc(db, "users", user.userId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1DC071",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Không xóa được trong authen
        await deleteDoc(colRef);
        Swal.fire({
          icon: "success",
          title: "Deleted user successfully",
          timer: 1500,
        });
      }
    });
  };
  return (
    <div>
      <Field className="my-10">
        <Label>Search for users here:</Label>
        <input
          type="text"
          placeholder="Search users by username..."
          className="px-5 py-4 text-[16px] font-semibold border border-gray-300 rounded-lg"
          onChange={handleFilter}
        />
      </Field>
      <Table className="mt-10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>

            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 &&
            userList.map((user) => (
              <tr key={user.id}>
                <td title={user.id}>{displayTruncatedID(user.userId, 8)}</td>
                <td>
                  <a href={user.avatar} target="_blank" rel="noreferrer">
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                    />
                  </a>
                </td>
                <td>
                  <div className="flex-1">
                    <h3 className="font-semibold max-w-[200px] whitespace-pre-wrap">
                      {user.username}
                    </h3>
                    <time className="text-sm text-gray-500">
                      Created at:{" "}
                      {displayLocalTimeAndDateBySeconds(user.createdAt.seconds)}
                    </time>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{renderLabelStatus(user?.status)}</td>
                <td>{renderUserRole(user?.role)}</td>
                <td>
                  <div className="flex gap-5 text-gray-400">
                    <ActionView></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-user?userId=${user.userId}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteUser(user)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {!isEmpty ? (
        <div className="mt-10">
          <Button onClick={handleLoadMoreUsers}>Load more</Button>
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

export default UserTable;
