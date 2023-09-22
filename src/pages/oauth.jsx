import React, { useState, useEffect } from "react";
import style from "../styles/oauth.module.css";
import KakaoButton from "../assets/kakaolink_btn_small.png";
import { useNavigate } from "react-router-dom";
import { apiClientWithoutToken, apiClientForRefresh } from "../api/auto_login";

const OAuth = () => {
  const navigate = useNavigate();

  const [isLogged, setIsLogged] = useState(false);
  const [nickname, setNickname] = useState("");
  const [thumbnailSrc, setThumbnailSrc] = useState("");

  const handleLogin = async () => {
    const response = await apiClientWithoutToken.get("/interview/oauth/url");
    const url = response.data["kakao_oauth_url"];
    window.location.href = url;
  };

  const handleLogout = async () => {
    const response = await apiClientWithoutToken.post("/interview/token/remove");

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
      response = await apiClientWithoutToken.get("/interview//userinfo");

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
      let response = await apiClientForRefresh.post("/interview/token/refresh");

      if (response.data.result) {
        autoLogin(); // 액세스 토큰이 갱신됬으므로 autoLogin을 호출합니다.
      } else {
        //리프레시 토큰 만료도 아니고 액세스 토큰도 갱신 안되면, 토큰 삭제.
        await apiClientWithoutToken.post("/interview/token/remove");

        alert("로그인을 다시 해주세요!");
        setIsLogged(false);
        setNickname("");
        setThumbnailSrc("");
      }
    } catch (error) {
      if (error.response.data["msg"] === "Token has expired") {
        //리프레시 토큰이 만료되었다면,
        setIsLogged(false);
        setNickname("");
        setThumbnailSrc("");
        handleLogin();
        return;
      }
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
