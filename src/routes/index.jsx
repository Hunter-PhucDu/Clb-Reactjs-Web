import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import Account from "../pages/account";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Management from "../pages/management";
import LoginAdmin from "../pages/loginAdmin";
import ForgotPassword from "../layouts/forgotPassword";
import LoginUser from "../pages/loginUser";
import SignUp from "../pages/signUp";


const Routers = () => {
  let auth = useSelector((state) => state.auth);

  const notify = (msg, type = "SUCCESS") => {
    if (type === "ERROR") {
      toast.error(msg);
    } else {
      toast.success(msg);
    }
  };

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          path="/admin/sign-in"
          element={
            !auth.isLoggedIn ? (
              <LoginAdmin notify={notify} />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />
        
        <Route
          path="/sign-in"
          element={
            !auth.isLoggedIn ? (
              <LoginUser notify={notify} />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />

        <Route
          path="/signup"
          element={
            !auth.isLoggedIn ? (
              <SignUp notify={notify} />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />

        <Route
          path="/forgotpassword"
          element={
            !auth.isLoggedIn ? (
              <ForgotPassword notify={notify} />
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
              <Navigate replace to={"/sign-in"} />
            )
          }
        />

        <Route
          path="/management"
          element={
            auth.account.role === "ADMIN" ? (
              <Management />
            ) : (<Navigate replace to={"/"} />)
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
