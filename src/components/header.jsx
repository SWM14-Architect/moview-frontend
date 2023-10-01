import React, { useEffect, useState } from "react";
import style from "../styles/header.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { roomIdAtom } from "../store/interviewRoomAtom";
import {userLoginAtom, userNicknameAtom, userProfileAtom} from "../store/userAtom";
import {jwt_token_remove_api, oauth_url_api} from "../api/jwt";
import HamburgerButton from "./mobile-only/hamburgerButton";

function HeaderMenu() {
  return (
    <>
      <ul>모두의인터뷰</ul>
    </>
  );
}

function InterviewMenu() {
  return (
    <>
      <ul>가상면접</ul>
    </>
  );
}

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRoom, setIsRoom] = useState(false);
  const [, setRoomID] = useRecoilState(roomIdAtom);
  const [userLogin, setUserLogin] = useRecoilState(userLoginAtom);
  const [userNickname, setUserNickname] = useRecoilState(userNicknameAtom);
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);

  const [isClickedHamburger, setIsClickedHamburger] = useState(false);

  const handleLogin = async () => {
    await oauth_url_api()
    .then((res) => {
      window.location.href = res.data["kakao_oauth_url"];
    })
    .catch((err) => {
    });
  };

  const handleLogout = async () => {
    await jwt_token_remove_api()
    .then((res) => {
      alert("정상적으로 로그아웃이 되었습니다.");
      setIsClickedHamburger(false);
      setUserLogin(false);
      setUserNickname("");
      setUserProfile("");
      navigate("/");
    })
    .catch((err) => {

    });
  };


  useEffect(() => {
    if (window.location.pathname === "/room") {
      setIsRoom(true);
    } else {
      setIsRoom(false);
    }
  }, [location]);

  const handleButtonClick = (e) => {
    e.preventDefault();
    setIsClickedHamburger(false);
    if (!isRoom) {
      setRoomID("modeSelect");
      navigate("/room");
    } else {
      setRoomID("modeSelect");
      navigate("/");
    }
  };

  const handleHamburgerClick = (e) => {
    e.preventDefault();
    setIsClickedHamburger(!isClickedHamburger);
  }

  return (
    <header style={{height:"70px"}}>
      <div style={{position:"fixed", zIndex:1, backgroundColor:"#fff", width:"100vw", height:"70px"}}>
        <div className={`container`}>
          <div className={`${style.navbar}`}>
            <nav className={`${style.nav}`}>
              {!isRoom ? <HeaderMenu /> : <InterviewMenu />}
            </nav>
            <div></div>
            <div>
              <div className={`mobile-only`}>
                <HamburgerButton
                  isClickedHamburger={isClickedHamburger}
                  isRoom={isRoom}
                  userLogin={userLogin}
                  userNickname={userNickname}
                  userProfile={userProfile}
                  handleButtonClick={handleButtonClick}
                  handleLogin={handleLogin}
                  handleLogout={handleLogout}
                  onClick={(e) => handleHamburgerClick(e)}
                />
              </div>
              {!userLogin ? (
                <div className={`pc-only ${style.nav}`}>
                  <button
                    className={`blackButton`}
                    style={{ marginRight: "15px" ,borderRadius: "5px"}}
                    onClick={(e) => handleLogin(e)}
                  >
                    {"카카오 로그인"}
                  </button>
                </div>
              ) : (
                <div className={`pc-only ${style.nav}`}>
                  <div style={{lineHeight:"35px", marginRight: "15px"}}>
                    {userNickname}님
                  </div>
                  <button
                    className={`blackButton`}
                    style={{ marginRight: "15px" ,borderRadius: "5px"}}
                    onClick={(e) => handleButtonClick(e)}
                  >
                    {!isRoom ? "면접시작 >" : "면접종료 >"}
                  </button>

                  <button
                    className={`blackButton`}
                    style={{ marginRight: "15px" , borderRadius: "5px"}}
                    onClick={(e) => handleLogout(e)}
                  >
                    카카오 로그아웃
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
