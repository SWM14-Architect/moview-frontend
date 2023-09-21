import React, {useEffect, useState} from "react";
import style from "../styles/header.module.css";
import {useLocation, useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {roomIdAtom} from "../store/interviewRoomAtom";


function HeaderMenu() {
  return (
    <>
      <ul>모두의인터뷰</ul>
      <ul>Services</ul>
      <ul>Pricing</ul>
    </>
  );
}

function InterviewMenu() {
  return (
    <>
      <ul>가상면접</ul>
    </>
  )
}

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRoom, setIsRoom] = useState(false);
  const [, setRoomID] = useRecoilState(roomIdAtom);

  useEffect(() => {
      if (window.location.pathname === "/room") {
        setIsRoom(true);
      }
      else {
        setIsRoom(false);
      }
  }, [location])

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (!isRoom) {
      setRoomID("interviewInput");
      navigate("/room");
    }
    else{
      setRoomID("interviewInput");
      navigate("/");
    }
  }

  return (
    <header>
      <div className={`container`}>
        <div className={`${style.navbar}`}>
          <nav className={`${style.nav}`}>
            {!isRoom ? <HeaderMenu /> : <InterviewMenu />}
          </nav>
          <button className={`blackButton`} style={{marginRight:"15px"}} onClick={(e) => handleButtonClick(e)}>
            {!isRoom ? "면접시작 >" : "면접종료 >"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;