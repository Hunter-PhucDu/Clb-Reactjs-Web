import React from "react"
import "./index.scss"
import Box1 from "../../../components/box1"
import Box2 from "../../../components/box2"
import Box3 from "../../../components/box3"

const Containers = () => {
  return (
    <div className="content-container">
      <h1>Mục tiêu và phương hướng của Câu lạc bộ</h1>
      <Box1 />
      <Box2 />
      <Box3 />

      <h1 className="latest-news">Tin tức mới</h1>
      <p className="paragraph">
        Tổ chức sự kiện.....
      </p>
    </div>
  )
}

export default Containers
