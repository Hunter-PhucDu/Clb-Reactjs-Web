import { useState } from "react";
import { MdDelete } from "react-icons/md";
import accountAPI from "../../../../api/account.api";
import PopupConfirm from "../../../../components/popupConfirm";

const AccountTable = ({ accounts, notify, getAccounts, currentPage }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [accountIdPicked, setAccountIdPicked] = useState("");

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const handleDeleteAccount = async () => {
    try {
      await accountAPI.deleteAccount(accountIdPicked);
      getAccounts();
      notify("Xóa tài khoản thành công!");
    } catch (err) {
      console.log(err);
      notify(err.response?.data, "ERROR");
    }
  };

  return (
    <table className="table table-hover text-center">
      <thead>
        <tr>
          <th>Stt</th>
          <th>Tên đăng nhập</th>
          <th>Email</th>
          <th>Vai trò</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {accounts?.map((account, index) => (
          <tr key={index}>
            <td>{(currentPage - 1) * 6 + (index + 1)}</td>
            <td>{account.userName}</td>
            <td>{account.email}</td>
            <td>{account.role}</td>
            <td>
              {" "}
              <MdDelete
                className="bin"
                onClick={(e) => {
                  setAccountIdPicked(account._id);
                  openPopup();
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
      {isPopupOpen && (
        <PopupConfirm
          message={"Bạn có chắc muốn xóa tài khoản này không?"}
          closePopup={closePopup}
          handleAction={handleDeleteAccount}
        />
      )}
    </table>
  );
};

export default AccountTable;
