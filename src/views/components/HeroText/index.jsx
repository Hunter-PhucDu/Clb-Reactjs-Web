import React from "react"
import { Navigate } from "react"
import "./index.scss"

const HeroText = () => {


  return (
    <div className="introduction">
      <h1>Câu lạc bộ Lập trình</h1>
      <p>
        Mục đích tập hợp, kết nối những bạn sinh viên tự nguyện, có niềm đam mê về lập trình, học tập. Có mong muốn học tập, chia sẻ kiến thức, kỹ năng, và kinh nghiệm với nhau.
        Cùng hỗ trợ nhau giải quyết những khó khăn trong quá trình học tập.
      </p>
      <button
        onClick={(e) => <Navigate replace to="/registration" />}>Tham gia cùng chúng tớ</button>
      <button onClick={() => window.open("https://www.facebook.com/clblaptrinhutb", "_blank")}>Các hoạt động của Câu lạc bộ</button>
    </div>
  )
}

export default HeroText
