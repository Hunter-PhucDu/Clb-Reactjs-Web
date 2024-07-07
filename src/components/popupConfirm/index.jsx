import Modal from "react-modal";
import "./index.scss";

const customStyles = {
  content: {
    margin: "auto auto",
    width: "400px",
    height: "170px",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,.5)",
  },
};

const PopupConfirm = ({ message, closePopup, handleAction }) => {
  const handleBtnAction = async (action) => {
    action === "confirmed" && handleAction() 
    closePopup()
  };
  return (
    <Modal
      isOpen={true}
      onRequestClose={closePopup}
      ariaHideApp={false}
      style={customStyles}
      contentLabel="Account Modal"
      id="popup-confirm-modal"
    >
      <p className="text-center">{message}</p>
      <div className="popup-action">
        <button onClick={(e) => handleBtnAction("cancelled")}>Hủy</button>
        <button onClick={(e) => handleBtnAction("confirmed")}>Xác nhận</button>
      </div>
    </Modal>
  );
};

export default PopupConfirm;
