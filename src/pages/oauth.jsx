import React, { useState, useEffect } from "react";
import style from "../styles/oauth.module.css";
import KakaoButton from "../assets/kakaolink_btn_small.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 기본 URL 설정
const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}/interview`,
  withCredentials: true, // 쿠키(세션 ID)를 전달하기 위한 CORS 설정
});

const OAuth = () => {
  const navigate = useNavigate();

  const [isLogged, setIsLogged] = useState(false);
  const [nickname, setNickname] = useState("");
  const [thumbnailSrc, setThumbnailSrc] = useState("");

  const handleLogin = async () => {
    const response = await apiClient.get("/oauth/url");
    const url = response.data["kakao_oauth_url"];
    window.location.href = url;
  };

  const handleLogout = async () => {
    const response = await apiClient.post("/token/remove");

    if (response) {
      alert("정상적으로 로그아웃이 되었습니다.");

      setIsLogged(false);
      setNickname("");
      setThumbnailSrc("");
    }
    navigate("/");
  };

  const autoLogin = async () => {
    let response;
    try {
      response = await apiClient.get("/userinfo");
      console.log(response);
      setNickname(response.data.nickname);
      setThumbnailSrc(response.data.thumbnail_image_url);
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
      console.log("refresh!!");
      let data = await apiClient.post("/token/refresh");
      console.log(data);

      if (data.result) {
        autoLogin(); // 이 부분에서 autoLogin을 호출합니다.
      } else {
        if (data.msg === "Token has expired") {
          setIsLogged(false);
          setNickname("");
          setThumbnailSrc("");
          handleLogin();
          return;
        }
        await apiClient.post("/token/remove");

        alert("로그인을 다시 해주세요!");
        setIsLogged(false);
        setNickname("");
        setThumbnailSrc("");
      }
    } catch (error) {
      console.log(error);
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
