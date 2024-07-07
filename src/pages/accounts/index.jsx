import "./index.scss";
import { IoMdAddCircleOutline } from "react-icons/io";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useCallback, useState, useRef, useEffect } from "react";
import accountAPI from "../../api/account.api";
import AccountModal from "./components/accountModal";
import AccountTable from "./components/accountTable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import { AiOutlineSearch } from "react-icons/ai";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [keySearch, setKeySearch] = useState("");
  let page = useRef(1)

  const notify = (msg, type = "SUCCESS") => {
    toast.success(msg, { type: toast.TYPE[type] });
  };

  function openModal() {
    setIsModalOpened(true);
  }

  function closeModal() {
    setIsModalOpened(false);
  }

  const onKeySearchChange = (e) => {
    setKeySearch(e.target.value);
    if (e.target.value) {
      setCurrentPage(1);
    } else {
      setCurrentPage(page.current);
    }
  };

  const getAccounts = useCallback(
    async (
      params = { page: currentPage, sort: "createdAt", key: keySearch }
    ) => {
      let res = await accountAPI.getAccounts(params);
      setAccounts([...res.docs]);
      setPagination(res.pagination);
    },
    [currentPage, keySearch]
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
    page.current = event.selected + 1
  };

  useEffect(() => {
    getAccounts();
  }, [getAccounts]);

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="container mt-5 mb-5 management-users">
        <div className="title">
          <h3 className="">QUẢN LÝ TÀI KHOẢN NGƯỜI DÙNG</h3>
          <div className="btn-action">
            <span>
              <input
                type="text"
                onChange={onKeySearchChange}
                placeholder="Tìm kiếm"
              />
              <AiOutlineSearch className="search" />
            </span>
            <span onClick={openModal}>
              <IoMdAddCircleOutline /> Thêm người dùng
            </span>
          </div>

          {isModalOpened && (
            <AccountModal
              isModalOpened={isModalOpened}
              closeModal={closeModal}
              notify={notify}
              getAccounts={getAccounts}
            />
          )}
        </div>

        <AccountTable
          accounts={accounts}
          getAccounts={getAccounts}
          notify={notify}
          currentPage={currentPage}
        />

        {accounts.length > 0 && (
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pagination.totalPages}
            previousLabel="< prev"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Accounts;
