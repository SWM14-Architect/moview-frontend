import React from "react";
import Logo from "../components/Logo";
import '../styles/button.css'
import "../styles/outer-div.css"
import {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {roomIdAtom} from "../store/room_atom";


function IndexPage() {
  const [, setRoomID ] = useRecoilState(roomIdAtom);
  const navigate = useNavigate();
  function handleButtonClick(e) {
    e.preventDefault();
    setRoomID("input");
    navigate("/room");
  }
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
