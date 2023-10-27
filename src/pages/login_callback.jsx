import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useRecoilState} from "recoil";
import {userLoginAtom, userNicknameAtom, userProfileAtom} from "../store/userAtom";
import {toast} from "react-toastify";
import {redirectAtom} from "../store/redirectAtom";

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
  const [redirectPath, setRedirectPath] = useRecoilState(redirectAtom);

  const callOAuthAPI = async () => {
    let params = new URL(document.URL).searchParams;
    let code = params.get("code");

    await apiClient
      .get("/oauth", {params: {code}})
      .then((res) => {
        const userProfile = res.data?.message.user_profile;
        const hasSignedUp = res.data?.message.has_signed_up;
        setUserLogin(true);
        setUserNickname(userProfile["profile_nickname"]);
        setUserProfile(userProfile["profile_image_url"]);

        if(hasSignedUp){
          if(process.env.REACT_APP_ENV === "prod") {
            const kakaoSignupScript = document.createElement('script');
            kakaoSignupScript.type = 'text/javascript';
            kakaoSignupScript.id = 'kakao-signup-script';
            kakaoSignupScript.innerHTML = `kakaoPixel('${process.env.REACT_APP_KAKAO_SDK_ID}').completeRegistration();`;
            document.head.appendChild(kakaoSignupScript);
          }
          toast.info("회원가입이 완료되었습니다!", {});
        }

        if(redirectPath === null) {
          navigate("/");
        } else {
          navigate(redirectPath);
          setRedirectPath(null);
        }
      })
      .catch((error) => {
        toast.error(`${error.response?.data.message ? error.response.data.message.error : "오류가 발생했습니다!\n" + error.message}`, {});
      });
  };

  useEffect(() => {
    callOAuthAPI();

    return () => {
      const kakaoSignupScript = document.getElementById('kakao-signup-script');
      if (kakaoSignupScript) {
        document.head.removeChild(kakaoSignupScript);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div></div>;
};

export default KakaoCallback;
