import "./App.scss";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useState } from "react";
import News from "./components/news";
import Contact from "./components/contact";
import RegistrationForm from "./components/rigistration";
import Members from "./components/members";
import LoginUser from "./components/loginUser";
import SignUpForm from "./components/signUp";


const App = ({ notify }) => {
  let [activeOn, setActiveOn] = useState("home");

  return (
    <div className="app">
      <Header setActiveOn={setActiveOn} />
      {activeOn === "home" && (
        <>  

        </>
      )}
      {activeOn === "info" && <Members notify={notify} />}
      {activeOn === "registrations" && <RegistrationForm notify={notify} />}
      {activeOn === "news" && <News notify={notify} />}
      {activeOn === "contact" && <Contact notify={notify} />}
      {activeOn === "login" && <LoginUser notify={notify} />}
      {activeOn === "signup" && <SignUpForm notify={notify} />}
      <Footer />
    </div>
  );
};

export default App;


