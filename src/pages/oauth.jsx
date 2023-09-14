import React, { useState } from "react";
import style from "../styles/oauth.module.css";
import KakaoButton from "../assets/kakaolink_btn_small.png";

const OAuth = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [nickname, setNickname] = useState("");
  const [thumbnailSrc, setThumbnailSrc] = useState("");

  const handleLogin = () => {
    // 로그인 로직
  };

  const handleLogout = () => {
    // 로그아웃 로직
  };

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
              <img src={KakaoButton} />
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
