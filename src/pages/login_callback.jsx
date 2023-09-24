import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 기본 URL 설정
const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}/interview`,
  withCredentials: true, // 쿠키(세션 ID)를 전달하기 위한 CORS 설정
});

const KakaoCallback = () => {
  const navigate = useNavigate();

  const callOAuthAPI = async () => {
    let params = new URL(document.URL).searchParams;
    let code = params.get("code");

    await apiClient
      .get("/oauth", {
        params: {
          code,
        },
      })
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("cannot call oauth api", error);
      });
  };

  useEffect(() => {
    callOAuthAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div></div>;
};

export default KakaoCallback;
