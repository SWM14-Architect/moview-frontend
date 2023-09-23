import React, { useEffect, useState } from "react";
import style from "../styles/header.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { roomIdAtom } from "../store/interviewRoomAtom";
import { apiClientWithoutToken, apiClientForRefresh } from "../api/api_instance";
import {userLoginAtom, userNicknameAtom, userProfileAtom} from "../store/userAtom";
import {jwt_token_remove_api, oauth_url_api} from "../api/jwt";

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
    if (!isRoom) {
      setRoomID("interviewInput");
      navigate("/room");
    } else {
      setRoomID("interviewInput");
      navigate("/");
    }
  };

  return (
    <header>
      <div className={`container`}>
        <div className={`${style.navbar}`}>
          <nav className={`${style.nav}`}>
            {!isRoom ? <HeaderMenu /> : <InterviewMenu />}
          </nav>
          <div></div>
          {!userLogin ? (
            <button
              className={`blackButton`}
              style={{ marginRight: "15px" }}
              onClick={(e) => handleLogin(e)}
            >
              {"카카오 로그인"}
            </button>
          ) : (
            <>
              <div id="nickname" className={`${style.nickname}`}>
                안녕하세요, 님.
              </div>

              <button
                className={`blackButton`}
                style={{ marginRight: "15px" }}
                onClick={(e) => handleButtonClick(e)}
              >
                {!isRoom ? "면접시작 >" : "면접종료 >"}
              </button>
              <button
                className={`blackButton`}
                style={{ marginRight: "15px" }}
                onClick={(e) => handleLogout(e)}
              >
                {"카카오 로그아웃"}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
