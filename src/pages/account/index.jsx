import Header from "../../layouts/header";
import Footer from "../../layouts/footer";
import { useSelector } from "react-redux";
import "./index.scss";
import { useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = () => {
  const auth = useSelector((state) => state.auth);
  const { field } = useParams();

  const notify = (msg, type = "SUCCESS") => {
    toast.success(msg, { type: toast.TYPE[type] });
  };

  return (
    <><div className="account">
      <Header />
      <ToastContainer />
      <div className="account-body mt-5 mb-5">
        <div className="row">
  
        </div>
      </div>
      <Footer />
    </div>
    </>

  );
};

export default Account;
