import "./App.scss";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useState } from "react";
import News from "./components/news";
import Contact from "./components/contact";
import RegistrationForm from "./components/rigistrations";
import Members from "./components/members";



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
      <Footer />
    </div>

    
  );
};

export default App;
