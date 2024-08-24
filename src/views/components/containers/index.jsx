import React from "react"
import "./index.scss"
import Box1 from "../../../components/box1"
import Box2 from "../../../components/box2"
import Box3 from "../../../components/box3"
import {
  CContainer,
} from '@coreui/react'

const Containers = () => {
  return (
    <CContainer>
      <div className="content-container">
        <Box1 />
        <Box2 />
        <Box3 />
        <h1 className="latest-news">Tin tức mới</h1>
        <p className="paragraph">
          Tổ chức sự kiện.....
        </p>
      </div>
    </CContainer>
  )
}

export default Containers
