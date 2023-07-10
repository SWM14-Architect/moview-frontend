import React, { useState } from "react";
import Header from "../components/header"
import Footer from "../components/footer"
import Logo from "../components/Logo";
import '../styles/button.css'
import "../styles/outer-div.css"

function IndexPage() {
  const [isIndex, setIsIndex] = useState(false);

  const handleButtonClick = () => {
    setIsIndex(true);
  };

  return (
    <div className="outer-div">
      <Header />
      <Logo />
      <div className="big-button-div">
        <button className="big-button" onClick={handleButtonClick}>
          START
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default IndexPage;
