import PostAdd from "module/Post/PostAdd";
import PostManage from "module/Post/PostManage";
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
          <Route
            path="/dashboard"
            element={<DashboardPage></DashboardPage>}
          ></Route>
          <Route
            path="/manage/add-post"
            element={<PostManage></PostManage>}
          ></Route>
          <Route path="/manage/post" element={<PostAdd></PostAdd>}></Route>
          <Route path="/*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
