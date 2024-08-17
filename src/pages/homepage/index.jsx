import "./index.scss";
import Header from "../../layouts/header";
import Footer from "../../layouts/footer";
import { useState } from "react";
import News from "../../layouts/news";
import Contact from "../../layouts/contact";
import RegistrationForm from "../../layouts/rigistration";
import Members from "../../layouts/members";
import MainImg from "../../assets/images/main.png";
import HeroText from "../../layouts/HeroText";
import Containers from "../../layouts/containers";


const Homepage = ({ notify }) => {
  let [activeOn, setActiveOn] = useState("home");

  return (
    <div className="app">
      <Header setActiveOn={setActiveOn} />

      {activeOn === "home" && (
        <div className="homepage">
          <div className="content-page">
            <div className="overlay"> </div>
            <div className="image">
              <img src={MainImg} alt="Illustrated svg" />
            </div>
            <HeroText setActiveOn={setActiveOn} />
          </div>
          <div className="body-page">
            <Containers />
          </div>
        </div>
      )}
      {activeOn === "info" && <Members notify={notify} />}
      {activeOn === "registrations" && <RegistrationForm notify={notify} />}
      {activeOn === "news" && <News notify={notify} />}
      {activeOn === "contact" && <Contact notify={notify} />}

      <Footer />
    </div>
  );
};

export default Homepage;


