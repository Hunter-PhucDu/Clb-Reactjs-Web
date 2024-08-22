import React from "react"
import "./index.scss"
import MainImg from "../../../assets/images/main.png"
import HeroText from "../../layouts/HeroText"
import Containers from "../../layouts/containers"
import DefaultLayout from "../../../layout/DefaultLayout"

const Homepage = () => {

  return (
    <DefaultLayout>
      <div className="home-container">
        <div className="homepage">
          <div className="content-page">
            <div className="overlay"> </div>
            <div className="image-main">
              <img src={MainImg} alt="Illustrated svg" />
            </div>
            <HeroText />
          </div>
          <div className="body-page">
            <Containers />
          </div>
        </div>      
      </div>
    </DefaultLayout>
  )
}

export default Homepage