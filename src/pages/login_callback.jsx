import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useRecoilState} from "recoil";
import {userLoginAtom, userNicknameAtom, userProfileAtom} from "../store/userAtom";
import {toast} from "react-toastify";

// 기본 URL 설정
const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}/interview`,
  withCredentials: true, // 쿠키(세션 ID)를 전달하기 위한 CORS 설정
});

const KakaoCallback = () => {
  const navigate = useNavigate();

  const [, setUserLogin] = useRecoilState(userLoginAtom);
  const [, setUserNickname] = useRecoilState(userNicknameAtom);
  const [, setUserProfile] = useRecoilState(userProfileAtom);

  const callOAuthAPI = async () => {
    let params = new URL(document.URL).searchParams;
    let code = params.get("code");

    await apiClient
      .get("/oauth", {params: {code}})
      .then((res) => {
        setUserLogin(true);
        setUserNickname(res.data["profile_nickname"]);
        setUserProfile(res.data["profile_image_url"]);
        navigate("/");
      })
      .catch((error) => {
        toast.error(`${error.response?.data.message ? error.response.data.message.error : "오류가 발생했습니다!\n" + error.message}`, {});
      });
  };

  useEffect(() => {
    callOAuthAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div></div>;
};

export default KakaoCallback;
