import React, {useEffect, useState} from "react";
import style from "../styles/header.module.css";
import InterviewButton from "./interviewButton";
import {useLocation} from "react-router-dom";

function Header() {
  const location = useLocation()
  const [isRoom, setIsRoom] = useState(false);

  useEffect(() => {
      if (window.location.pathname === "/room") {
        setIsRoom(true);
      }
      else {
        setIsRoom(false);
      }
  }, [location])

  return (
    <header>
      <div className={`container`}>
        <div className={`${style.navbar}`}>
          <nav className={`${style.nav}`}>
            <ul>모두의인터뷰</ul>
            <ul>Services</ul>
            <ul>Pricing</ul>
          </nav>
          {!isRoom ? <InterviewButton text={"면접시작 >"} style={{marginRight:"15px"}}/> : <InterviewButton text={"면접종료"} style={{marginRight:"15px"}}/>}
        </div>
      </div>
    </header>
  );
}

export default Header;
