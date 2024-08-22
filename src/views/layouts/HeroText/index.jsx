import React from "react"
import { Navigate } from "react"
import "./index.scss"

const HeroText = () => {


  return (
    <div className="introduction">
      <h1>Câu lạc bộ Lập trình</h1>
      <h1>Trường đại học Tây Bắc</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos nobis laboriosam alias iure ut eum corrupti quod obcaecati, recusandae, dolore dolorum excepturi quis eos quisquam corporis. Ipsa velit a tempora.
      </p>
      <button
        onClick={(e) => <Navigate replace to="/registration" />}>Tham gia cùng chúng tớ</button>
      <button onClick={() => window.open("https://www.facebook.com/clblaptrinhutb", "_blank")}>Các hoạt động của Câu lạc bộ</button>
    </div>
  )
}

export default HeroText
