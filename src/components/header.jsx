import React, {useEffect, useState} from "react";
import style from "../styles/header.module.css";
import {useLocation, useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {roomIdAtom} from "../store/room_atom";

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
      alert("정말로 면접을 종료하시겠습니까?\n나중에 alert 말고, 선택지로 해서 취소도 가능하게 만들기");
      setRoomID("interviewInput");
      navigate("/");
    }
  }

  return (
    <header>
      <div className={`container`}>
        <div className={`${style.navbar}`}>
          <nav className={`${style.nav}`}>
            <ul>모두의인터뷰</ul>
            <ul>Services</ul>
            <ul>Pricing</ul>
          </nav>
          <button className={`blackButton`} style={{marginRight:"15px"}} onClick={(e) => handleButtonClick(e)}>{!isRoom ? "면접시작 >" : "면접종료 >"}</button>
        </div>
      </div>
    </header>
  );
}

export default Header;