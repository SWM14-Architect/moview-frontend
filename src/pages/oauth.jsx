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

  const openWindowPopup = (url, name) => {
    const options =
      "top=10, left=10, width=500, height=600, status=no, menubar=no, toolbar=no, resizable=no";
    return window.open(url, name, options); // 리액트스럽지 않은 코드
  };

  const handleLogin = async () => {
    //document.querySelector("#loading").classList.remove('display_none');
    try {
      const res = await apiClient.get("/oauth/url");
      const url = res.data["kakao_oauth_url"];
      console.log(url);

      const newWindow = openWindowPopup(url, "카카오톡 로그인");

      const checkConnect = setInterval(function () {
        if (!newWindow || !newWindow.closed) return;
        clearInterval(checkConnect);

        if (getCookie("logined") === "true") {
          //window.location.reload();
        }else{
          //document.querySelector("#loading").classList.add('display_none');
        }
      }, 1000);
    } catch (error) {
      console.error("Error fetching OAuth URL:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/token/remove", {
        headers: { "Content-Type": "application/json" },
        method: "GET",
      });

      const data = await response.json();

      if (data.result) {
        console.log("로그아웃 성공");
        alert("정상적으로 로그아웃이 되었습니다.");

        setIsLogged(false);
        setNickname("");
        setThumbnailSrc("");
      } else {
        console.log("로그아웃 실패");
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
        setThumbnailSrc(data.profile);
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
  }, []);

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
