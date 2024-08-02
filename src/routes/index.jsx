import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../pages/homepage/App";
import SignUp from "../pages/signUp";
import Account from "../pages/account";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../pages/login";
import { useSelector } from "react-redux";
import TestApiPost from "../pages/testApiPost";
import TestApiGet from "../pages/testApiGet";
import AdminManagement from "../pages/adminManagement";

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
          path="/admin/management"
          element={
          
              <AdminManagement />
          }
  
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
