import React, { useState } from "react";

const OAuth = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [nickname, setNickname] = useState("");
  const [thumbnailSrc, setThumbnailSrc] = useState("");

  const handleLogin = () => {

  };

  const handleLogout = () => {

  };

  return (
    <div className="Wrapper">
      <div className="title">Kakao OAuth Login</div>
      <div className="info">
        Kakao OAuth
      </div>

      {!isLogged ? (
        <div id="kakao" className="kakao_button" onClick={handleLogin}>
          <img src="/path/to/kakaolink_btn_small.png" alt="kakao oauth" />
          <span>카카오 로그인</span>
        </div>
      ) : (
        <>
          <img
            id="thumbnail"
            src={thumbnailSrc}
            className="thumbnail"
            alt="User Thumbnail"
          />
          <div id="nickname" className="nickname">
            {nickname}
          </div>
          <div id="logout" className="logout" onClick={handleLogout}>
            <span>로그아웃</span>
          </div>
        </>
      )}
      {/* Loading part, hidden by default, toggle as needed */}
      <div id="loading" className="loading">
        <div className="loading_circle"></div>
      </div>
    </div>
  );
};

export default OAuth;
