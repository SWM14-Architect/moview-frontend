import React, { useState } from "react";
import Logo from "../components/Logo";
import '../styles/button.css'
import "../styles/outer-div.css"
import {Link} from "react-router-dom";

function IndexPage() {
  return (
    <div className="outer-div">
      <Logo />
      <div className="big-button-div">
        <Link className="big-button" to={"/input"}>
          START
        </Link>
      </div>
    </div>
  );
}

export default IndexPage;
