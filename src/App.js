import Homepage from "pages/Homepage";
import LoginPage from "pages/LoginPage";
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
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
