import React, { useEffect }  from "react"
import "./index.scss"
import MainImg from "../../../assets/images/main.png"
import HeroText from "../../components/HeroText"
import Containers from "../../components/containers"
import DefaultLayout from "../../../layout/DefaultLayout"

const Homepage = () => {
  useEffect(() => {
    document.title = "Clb Lập trình"
  }, [])


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