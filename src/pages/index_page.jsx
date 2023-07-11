import React, { useState } from "react";
import Logo from "../components/Logo";
import '../styles/button.css'
import "../styles/outer-div.css"
import {Link} from "react-router-dom";

function IndexPage() {
  const [isIndex, setIsIndex] = useState(false);

  const handleButtonClick = () => {
    setIsIndex(true);
  };

  return (
    <div className="outer-div">
      <Logo />
      <div className="big-button-div">
        <button className="big-button" onClick={handleButtonClick}>
          START
        </button>
      </div>
    </div>
  );
}

export default IndexPage;
