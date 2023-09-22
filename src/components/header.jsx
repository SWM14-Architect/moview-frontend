import React, { useEffect, useState } from "react";
import style from "../styles/header.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { roomIdAtom } from "../store/interviewRoomAtom";
import { apiClientWithoutToken, apiClientForRefresh } from "../api/api_client_token";

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

  const [isLogged, setIsLogged] = useState(false);
  const [nickname, setNickname] = useState("");

  const handleLogin = async () => {
    const response = await apiClientWithoutToken.get("/interview/oauth/url");
    const url = response.data["kakao_oauth_url"];
    window.location.href = url;
  };

  const handleLogout = async () => {
    const response = await apiClientWithoutToken.post(
      "/interview/token/remove"
    );

    if (response) {
      alert("정상적으로 로그아웃이 되었습니다.");

      setIsLogged(false);
      setNickname("");
    }
    navigate("/");
  };

  const autoLogin = async () => {
    let response;
    try {
      response = await apiClientWithoutToken.get("/interview/userinfo");
      setNickname(response.data.profile_nickname);
      setIsLogged(true);
    } catch (error) {
      if (
        error.response.data["msg"] === 'Missing cookie "access_token_cookie"'
      ) {
        return;
      } else if (error.response.data["msg"] === "Token has expired") {
        refreshToken();
        return;
      }
      return;
    }
  };

  const refreshToken = async () => {
    try {
      let response = await apiClientForRefresh.post("/interview/token/refresh");

      if (response.data.result) {
        autoLogin(); // 액세스 토큰이 갱신됬으므로 autoLogin을 호출합니다.
      } else {
        //리프레시 토큰 만료도 아니고 액세스 토큰도 갱신 안되면, 토큰 삭제.
        await apiClientWithoutToken.post("/interview/token/remove");

        alert("로그인을 다시 해주세요!");
        setIsLogged(false);
        setNickname("");
      }
    } catch (error) {
      if (error.response.data["msg"] === "Token has expired") {
        //리프레시 토큰이 만료되었다면,
        setIsLogged(false);
        setNickname("");
        handleLogin();
        return;
      }
    }
  };


  useEffect(() => {
    autoLogin();
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
          {!isLogged ? (
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
                안녕하세요, {nickname} 님.
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
