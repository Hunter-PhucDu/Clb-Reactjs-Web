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

  let [active, setActive] = useState(['active', '', '', '', ''])

  const handleClickActiveNav = (key, name) => {
    let arr = ['', '', '', '', '']
    arr[key] = 'active'
    setActiveOn(name)
    setActive(arr)
  }


  return (
    <header>
      <div className="header-container">
        <div className="header-top">
          <div className="header-content">
            <div className="logo">
              <Link to="/">
                <img
                  src={require("../../assets/image/logoCLb.png")}
                  alt="logo"
                />
              </Link>
            </div>
          </div>
          <div className="header-content">
            <div class="home">
              <div class={active[1]} onClick={(e) => handleClickActiveNav(0, 'home')}>
                <Link to="/" className="home-link">
                  Trang chủ
                </Link>
              </div>
            </div>
          </div>

          <div className="header-content">
            <div class="info">

              Giới thiệu
              <span className="info-container">
                <ul className="sub-info">
                  <Link to="/">
                    <div class={active[2]} onClick={(e) => handleClickActiveNav(1, 'info')}>
                      <li> Thành viên </li>
                    </div>
                  </Link>
                  <Link to="/">
                    <div class={active[2]} onClick={(e) => handleClickActiveNav(1, 'info')}>
                      <li> Thành viên </li>
                    </div>
                  </Link>
                </ul>
              </span>
            </div>
          </div>


          <div className="header-content">
            <div class="registrations">
              <div className={active[3]} onClick={(e) => handleClickActiveNav(2, 'registrations')}>
                <Link to="/" className="home-link">
                  Tuyển thành viên
                </Link>
              </div>
            </div>
          </div>

          <div className="header-content">
            <div class="news">
              <div class={active[4]} onClick={(e) => handleClickActiveNav(3, 'news')}>
                <Link to="/" className="home-link">
                  Tin tức
                </Link>
              </div>
            </div>
          </div>

          <div className="header-content">
            <div class="contact">
              <div class={active[5]} onClick={(e) => handleClickActiveNav(4, 'contact')}>
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
                      <FaUserCircle /> {auth.account.userName}
                      <ul className="user-action">
                        {auth.account.role === "admin" ? (
                          <>
                            <Link to="/account/profile">
                              <li> Tài khoản của tôi </li>
                            </Link>
                            <Link to="/management/accounts">
                              <li> Quản lý người dùng </li>
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link to="/account/profile">
                              <li> Tài khoản của tôi </li>
                            </Link>
                          </>
                        )}
                        <li onClick={handleLogout}> Đăng xuất </li>
                      </ul>
                    </span>
                  </>
                ) : (
                  <div className="auth-container">
                    <div className="auth">
                      <Link to="/auth/sign-in">Đăng nhập</Link>
                    </div>
                    <div className="auth">
                      <Link to="/auth/sign-up"> Đăng ký</Link>
                    </div>
                  </div>
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
