import "./index.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaUserCircle } from "react-icons/fa";
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { onLogOut } from "../../redux/action/auth.action";

const Header = ({ setActiveOn }) => {
  let auth = useSelector((state) => state.auth);
  const [key, setKey] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleLogout = async () => {
    try {
      dispatch(onLogOut());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  let [active, setActive] = useState(["active", "", "", "", "", "", ""]);

  const handleClickActiveNav = (key, name) => {
    let arr = ["", "", "", "", "", "", ""];
    arr[key] = "active";
    setActiveOn(name);
    setActive(arr);
  };

  const defaultAvatar = "https://i.imgur.com/Uoeie1w.jpg";

  const formatAvatarUrl = (url) => {
    if (!url) return defaultAvatar;
    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `http://${url}`;
  };

  return (
    <header>
      <div className="container header-container">
        <div className="nav justify-content-center header-body">
          <div className="header-content ">
            <div className="logo">
              <div
                class={active[0]}
                onClick={(e) => handleClickActiveNav(0, "home")}
              >
                <Link to="/">
                  <img src={require("../../assets/images/DEA.png")} alt="logo" />
                </Link>
              </div>
            </div>
          </div>
          <div className="header-content">
            <div className="home">
              <div
                class={active[0]}
                onClick={(e) => handleClickActiveNav(0, "home")}
              >
                <Link to="/" className="home-link">
                  Trang chủ
                </Link>
              </div>
            </div>
          </div>

          <div className="header-content">
            <div className="info">
              <div>
                <a className="">
                  Giới thiệu
                </a>
                <span className="info-container">
                  <ul className="sub-info">
                    <Link to="/">
                      <div
                        class={active[1]}
                        onClick={(e) => { handleClickActiveNav(1, "info") }}
                      >
                        <li> Tổng quan </li>
                      </div>
                    </Link>
                    <Link to="/">
                      <div
                        class={active[7]}
                        onClick={(e) => handleClickActiveNav(7, "info")}
                      >
                        <li> Cơ cấu Thành viên </li>
                      </div>
                    </Link>
                    <Link to="/">
                      <div
                        class={active[8]}
                        onClick={(e) => handleClickActiveNav(8, "info")}
                      >
                        <li> Cựu Thành viên </li>
                      </div>
                    </Link>
                    <Link to="/">
                      <div
                        class={active[9]}
                        onClick={(e) => handleClickActiveNav(9, "info")}
                      >
                        <li> Tổ chức </li>
                      </div>
                    </Link>
                    <Link to="/">
                      <div
                        class={active[10]}
                        onClick={(e) => handleClickActiveNav(10, "info")}
                      >
                        <li> Thành tích </li>
                      </div>
                    </Link>
                  </ul>
                </span>
              </div>
            </div>
          </div>

          <div className="header-content">
            <div className="registrations">
              <div
                className={active[2]}
                onClick={(e) => handleClickActiveNav(2, "registrations")}
              >
                <Link to="/" className="home-link">
                  Tuyển thành viên
                </Link>
              </div>
            </div>
          </div>

          <div className="header-content">
            <div className="news">
              <div
                class={active[3]}
                onClick={(e) => handleClickActiveNav(3, "news")}
              >
                <Link to="/" className="home-link">
                  Tin tức
                </Link>
              </div>
            </div>
          </div>

          <div className="header-content">
            <div className="contact">
              <div
                class={active[4]}
                onClick={(e) => handleClickActiveNav(4, "contact")}
              >
                <Link to="/" className="home-link">
                  Liên hệ
                </Link>
              </div>
            </div>
          </div>

          <div className="header-content">
            <div className="account">
              {auth.isLoggedIn ? (
                <>
                  <div className="auth-login">
                    <span className="text-capitalize">
                      {auth.account.avatar ? (
                        <img
                          src={formatAvatarUrl(auth.account.avatar)}
                          alt="User Avatar"
                          className="user-avatar"
                          onError={(e) => (e.target.src = defaultAvatar)}
                        />
                      ) : (
                        <FaUserCircle className="default-avatar" />
                      )}
                      {auth.account.userName}
                    </span>

                    <FontAwesomeIcon
                      icon={faGear}
                      className="settings-icon"
                      onClick={toggleSettings}
                    />
                    <ul className={`settings-panel ${isSettingsOpen ? 'settings-open' : ''}`}>
                      {auth.account.role === "ADMIN" ? (
                        <>
                          <Link to="/account/profile">
                            <li>Tài khoản </li>
                          </Link>
                          <Link to="/management">
                            <li>Quản lý quản trị viên</li>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link to="/account/profile">
                            <li>Tài khoản của tôi</li>
                          </Link>
                        </>
                      )}
                      <li onClick={handleLogout}>Đăng xuất</li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div className="auth-content">
                    <div className="auth">
                      <div>
                        <Link to="/sign-in">Đăng nhập</Link>
                      </div>
                      <div>
                        <Link to="/signup">Đăng ký</Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;



