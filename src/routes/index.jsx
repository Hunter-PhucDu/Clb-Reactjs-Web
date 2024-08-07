import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../pages/homepage/App";
import Account from "../pages/account";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import AdminManagement from "../pages/adminManagement";
import LoginAdmin from "../pages/homepage/components/loginAdmin";


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
          path="admin/login"
          element={
            !auth.isLoggedIn ? (
              <LoginAdmin notify={notify} />
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
          path="/admin/management"
          element={
            auth.account.role === "ADMIN" ? (
              <AdminManagement />
            ) : (<Navigate replace to={"/"} />)
          }
        />
      </Routes>


    </BrowserRouter>
  );
};

export default Routers;
