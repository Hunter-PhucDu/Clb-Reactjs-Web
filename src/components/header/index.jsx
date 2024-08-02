import "./index.scss";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authAPI from "../../api/auth.api";
import { onLogOut } from "../../redux/action/auth.action";

const Header = ({ setActiveOn }) => {
  let auth = useSelector((state) => state.auth);
  const [key, setKey] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onKeyChange = (e) => {
    setKey(e.target.value);
  };
  const handleLogout = async () => {
    try {
      await authAPI.logOut();
      dispatch(onLogOut());
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
  // Fallback URL for user avatars
  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/5556/5556468.png"; // Thay thế với URL hợp lệ nếu cần

  // Function to ensure the URL starts with http or https
  const formatAvatarUrl = (url) => {
    if (!url) return defaultAvatar; // Return default avatar if no URL
    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `http://${url}`;
  };

  return (
    <header>
      <div className="header-container">
        <div className="header-top">
          <div className="header-conten">
            <div className="logo">
              <Link to="/">
                <img src={require("../../assets/image/DEA.png")} alt="logo" />
              </Link>
            </div>
          </div>
          <div className="header-content">
            <div class="home">
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
            <div class="info">
              <div
                class={active[1]}
                onClick={(e) => handleClickActiveNav(1, "info")}
              >
                <Link to="/" className="info">
                  {" "}
                  Giới thiệu
                </Link>
                <span className="info-container">
                  <ul className="sub-info">
                    <Link to="/">
                      <div
                        class={active[1]}
                        onClick={(e) => handleClickActiveNav(1, "info")}
                      >
                        <li> Tổng quan </li>
                      </div>
                    </Link>
                    <Link to="/">
                      <div
                        class={active[1]}
                        onClick={(e) => handleClickActiveNav(1, "info")}
                      >
                        <li> Cơ cấu Thành viên </li>
                      </div>
                    </Link>
                    <Link to="/">
                      <div
                        class={active[1]}
                        onClick={(e) => handleClickActiveNav(1, "info")}
                      >
                        <li> Cựu Thành viên </li>
                      </div>
                    </Link>
                    <Link to="/">
                      <div
                        class={active[1]}
                        onClick={(e) => handleClickActiveNav(1, "info")}
                      >
                        <li> Tổ chức </li>
                      </div>
                    </Link>
                    <Link to="/">
                      <div
                        class={active[1]}
                        onClick={(e) => handleClickActiveNav(1, "info")}
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
            <div class="registrations">
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
            <div class="news">
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
            <div class="contact">
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
            <div className="accountt">
              <div className="header-top-right">
                {auth.isLoggedIn ? (
                  <>
                    <span className="text-capitalize">
                      {auth.account.avatar ? (
                        <img
                          src={formatAvatarUrl(auth.account.avatar)}
                          alt="User Avatar"
                          className="user-avatar"
                          onError={(e) => (e.target.src = defaultAvatar)} // Fallback nếu ảnh không tải được
                        />
                      ) : (
                        <FaUserCircle className="default-avatar" />
                      )}
                      {auth.account.userName}
                      <ul className="user-action">
                        {auth.account.role === "admin" ? (
                          <>
                            <Link to="/account/profile">
                              <li>Tài khoản của tôi</li>
                            </Link>
                            <Link to="/management/accounts">
                              <li>Quản lý người dùng</li>
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
                    </span>
                  </>
                ) : (
                  <>
                    <div className="auth-container">
                      <div className="auth">
                        <div
                          class={active[5]}
                          onClick={(e) => handleClickActiveNav(5, "login")}
                        >
                          <Link to="/">Đăng nhập</Link>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
