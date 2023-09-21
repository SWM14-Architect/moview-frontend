import React, { useState, useEffect } from "react";
import style from "../styles/oauth.module.css";
import KakaoButton from "../assets/kakaolink_btn_small.png";
import axios from "axios";

// 기본 URL 설정
const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}/interview`,
  withCredentials: true, // 쿠키(세션 ID)를 전달하기 위한 CORS 설정
});

const OAuth = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [nickname, setNickname] = useState("");
  const [thumbnailSrc, setThumbnailSrc] = useState("");

  const handleLogin = async () => {
    try {
      const response = await apiClient.get("/oauth/url");
      const url = response.data["kakao_oauth_url"];
      window.location.href=url;

    } catch (error) {
      console.error("Error fetching OAuth URL:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await apiClient.post("/token/remove");

      if (response) {
        alert("정상적으로 로그아웃이 되었습니다.");

        setIsLogged(false);
        setNickname("");
        setThumbnailSrc("");
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const autoLogin = async () => {

    try {
      const res = await apiClient.get("/userinfo");
      const data = res.data;
      if (!!data["msg"]) {
        if (data["msg"] === 'Missing cookie "access_token_cookie"') {
          console.log("자동로그인 실패");
          return;
        } else if (data["msg"] === "Token has expired") {
          console.log("Access Token 만료");
          refreshToken();
          return;
        }
      } else {
        console.log("자동로그인 성공");
        setNickname(data.nickname);
        setThumbnailSrc(data.thumbnail_image_url);
        setIsLogged(true);
      }
      // 이후 로직 (예: 상태 업데이트 또는 다른 함수 호출 등)
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const getCookie = (cookieName) => {
    let cookieValue = null;

    if (document.cookie) {
      const array = document.cookie.split(escape(cookieName) + "=");

      if (array.length >= 2) {
        const arraySub = array[1].split(";");
        cookieValue = unescape(arraySub[0]);
      }
    }

    return cookieValue;
  };

  const refreshToken = async () => {
    let data = await fetch("/token/refresh", {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    }).then((res) => res.json());

    if (data.result) {
      console.log("Access Token 갱신");
      autoLogin(); // 이 부분에서 autoLogin을 호출합니다.
    } else {
      if (data.msg === "Token has expired") {
        console.log("Refresh Token 만료");
        setIsLogged(false);
        setNickname("");
        setThumbnailSrc("");
        handleLogin();
        return;
      }

      fetch("/token/remove", {
        headers: { "Content-Type": "application/json" },
        method: "GET",
      });

      alert("로그인을 다시 해주세요!");
      setIsLogged(false);
      setNickname("");
      setThumbnailSrc("");
    }
  };



  useEffect(() => {
    // 자동 로그인 실행
    autoLogin();
    // eslint-disable-next-line
  });

  return (
    <div className={`${style.oauth}`}>
      <div className={`${style.oauth_body}`}>
        <div className={`${style.Wrapper}`}>
          <div className={`${style.title}`}>Kakao OAuth Login</div>
          <div className={`${style.info}`}>Kakao OAuth</div>

          {!isLogged ? (
            <div
              id="kakao"
              className={`${style.kakao_button}`}
              onClick={handleLogin}
            >
              <img src={KakaoButton} alt="kakao oauth" />
              <span>카카오 로그인</span>
            </div>
          ) : (
            <>
              <img
                id="thumbnail"
                src={thumbnailSrc}
                className={`${style.thumbnail}`}
                alt="User Thumbnail"
              />
              <div id="nickname" className={`${style.nickname}`}>
                {nickname}
              </div>
              <div
                id="logout"
                className={`${style.logout}`}
                onClick={handleLogout}
              >
                <span>로그아웃</span>
              </div>
            </>
          )}
          {/* Loading part, hidden by default, toggle as needed */}
          <div id="loading" className={`${style.loading}`}>
            <div className={`${style.loading_circle}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OAuth;
