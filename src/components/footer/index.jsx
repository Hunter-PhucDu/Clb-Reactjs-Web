import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
const Footer = () => {
  return (
    <div className="footer">
      <div class="container footer-content">
        <div class="col-md-4">
          <p>
            &copy; 2024 <strong> CÂU LẠC BỘ LẬP TRÌNH</strong>
          </p>
          <p>Địa chỉ: LCĐ KHOA KHTN - CN/Trường Đại Học Tây Bắc</p>
          <p>ĐT: 0123.456.789 - Fax: 0123 456 789</p>
        </div>
        <div class="col-md-4">
          <ul>
            <li>
              <p>
                <b>
                  Tôn chỉ
                </b>
              </p>
              <p>              
                  HỌC TẬP - THỰC HÀNH - TƯ DUY - SÁNG TẠO            
              </p>
            </li>
          </ul>
        </div>
        <div class="col-md-4">
          <p>
            <strong>KẾT NỐI VỚI CHÚNG TÔI</strong>          
          </p>
          <a href="https://www.facebook.com/clblaptrinhutb" target="_blank">
            <img src={require("../../assets/image/fb.png")} alt="Facebook" style={{ width: '30px', height: '30px', margin:'5px' }}/>
          </a>
          <a href="mailto:clblaptrinh@utb.edu.vn">
              <img src={require("../../assets/image/gm.png")} alt="Gmail" style={{ width: '30px', height: '30px', margin:'5px' }}/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
