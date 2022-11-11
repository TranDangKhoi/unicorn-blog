import CategoryAddNew from "module/Category/CategoryAddNew";
import CategoryManage from "module/Category/CategoryManage";
import DashboardLayout from "module/Dashboard/DashboardLayout";
import PostAddNew from "module/Post/PostAddNew";
import PostManage from "module/Post/PostManage";
import UserAddNew from "module/User/UserAddNew";
import UserManage from "module/User/UserManage";
import UserProfile from "module/User/UserProfile";
import DashboardPage from "pages/DashboardPage";
import Homepage from "pages/Homepage";
import LoginPage from "pages/LoginPage";
import NotFoundPage from "pages/NotFoundPage";
import PostDetailsPage from "pages/PostDetailsPage";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import SignUpPage from "./pages/SignUpPage";
function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Homepage></Homepage>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/sign-in" element={<LoginPage></LoginPage>}></Route>
          <Route
            path="/:slug"
            element={<PostDetailsPage></PostDetailsPage>}
          ></Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="/profile"
              element={<UserProfile></UserProfile>}
            ></Route>
            <Route
              path="/manage/category"
              element={<CategoryManage></CategoryManage>}
            ></Route>
            <Route
              path="/manage/posts"
              element={<PostManage></PostManage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<PostAddNew></PostAddNew>}
            ></Route>
            <Route
              path="/manage/add-category"
              element={<CategoryAddNew></CategoryAddNew>}
            ></Route>
            <Route
              path="/manage/user"
              element={<UserManage></UserManage>}
            ></Route>
            <Route
              path="/manage/add-user"
              element={<UserAddNew></UserAddNew>}
            ></Route>
          </Route>
          <Route path="/*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
