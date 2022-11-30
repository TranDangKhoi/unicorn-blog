import DashboardLayout from "module/Dashboard/DashboardLayout";
import UserProfile from "module/User/UserProfile";
import NotFoundPage from "pages/NotFoundPage";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
const Homepage = React.lazy(() => import("pages/Homepage.js"));
const LoginPage = React.lazy(() => import("pages/LoginPage.js"));
const SignUpPage = React.lazy(() => import("pages/SignUpPage.js"));
const PostDetailsPage = React.lazy(() => import("pages/PostDetailsPage.js"));
const CategoryPage = React.lazy(() => import("pages/CategoryPage.js"));
const DashboardPage = React.lazy(() => import("pages/DashboardPage.js"));
const UserAddNew = React.lazy(() => import("module/User/UserAddNew.js"));
const UserUpdate = React.lazy(() => import("module/User/UserUpdate.js"));
const UserManage = React.lazy(() => import("module/User/UserManage.js"));
const CategoryManage = React.lazy(() =>
  import("module/Category/CategoryManage.js")
);
const CategoryAddNew = React.lazy(() =>
  import("module/Category/CategoryAddNew.js")
);
const CategoryUpdate = React.lazy(() =>
  import("module/Category/CategoryUpdate.js")
);
const PostAddNew = React.lazy(() => import("module/Post/PostAddNew.js"));
const PostUpdate = React.lazy(() => import("module/Post/PostUpdate.js"));
const PostManage = React.lazy(() => import("module/Post/PostManage.js"));
function App() {
  return (
    <>
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route path="/" element={<Homepage></Homepage>}></Route>
            <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
            <Route path="/sign-in" element={<LoginPage></LoginPage>}></Route>
            <Route path="/blog" element={<NotFoundPage></NotFoundPage>}></Route>
            <Route
              path="/contact"
              element={<NotFoundPage></NotFoundPage>}
            ></Route>
            <Route
              path="/:slug"
              element={<PostDetailsPage></PostDetailsPage>}
            ></Route>
            <Route
              path="/category/:slug"
              element={<CategoryPage></CategoryPage>}
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
                path="/manage/update-post"
                element={<PostUpdate></PostUpdate>}
              ></Route>
              <Route
                path="/manage/add-category"
                element={<CategoryAddNew></CategoryAddNew>}
              ></Route>
              <Route
                path="/manage/update-category"
                element={<CategoryUpdate></CategoryUpdate>}
              ></Route>
              <Route
                path="/manage/user"
                element={<UserManage></UserManage>}
              ></Route>
              <Route
                path="/manage/add-user"
                element={<UserAddNew></UserAddNew>}
              ></Route>
              <Route
                path="/manage/update-user"
                element={<UserUpdate></UserUpdate>}
              ></Route>
            </Route>
            <Route path="/*" element={<NotFoundPage></NotFoundPage>}></Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </>
  );
}

export default App;
