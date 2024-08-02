import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Account from "../pages/account";
import AdminLogin from "../pages/Admin/LogIn";
import App from "../pages/homepage/App";
import Login from "../pages/login";
import SignUp from "../pages/signUp";
import TestApiGet from "../pages/testApiGet";
import TestApiPost from "../pages/testApiPost";

const Routers = () => {
  let auth = useSelector((state) => state.auth);

  const notify = (msg, type = "SUCCESS") => {
    toast.success(msg, { type: toast.TYPE[type] });
  };

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          path="/auth/sign-in"
          element={
            !auth.isLoggedIn ? (
              <Login notify={notify} />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />
        <Route
          path="/auth/sign-up"
          element={
            !auth.isLoggedIn ? (
              <SignUp notify={notify} />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />
        <Route path="/" element={<App notify={notify} />} />
        <Route
          path="/account/:field"
          element={
            auth.isLoggedIn ? (
              <Account />
            ) : (
              <Navigate replace to={"/auth/sign-in"} />
            )
          }
        />
        <Route
          path="/admin/testApiPost"
          element={<TestApiPost /> }
        />
        <Route
          path="/admin/testApiGet"
          element={<TestApiGet /> }
        />

         <Route
          path="admin/login"
          element={
            !auth.isLoggedIn ? (
              <AdminLogin notify={notify} />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />

      </Routes>


    </BrowserRouter>
  );
};

export default Routers;
