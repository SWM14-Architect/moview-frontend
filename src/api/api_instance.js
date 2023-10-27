import axios from "axios";
import {jwt_refresh_api} from "./jwt";
import {REFRESH_URL} from "../constants/apiConst";
import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {userLoginAtom, userNicknameAtom, userProfileAtom} from "../store/userAtom";
import {useNavigate} from "react-router-dom";
import {getCookie} from "../utils/useCookie";
import {toast} from "react-toastify";

export const API_INSTANCE = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
  withCredentials: true, // 쿠키(세션 ID)를 전달하기 위한 CORS 설정
});

export const API_INSTANCE_TO_INJECT_TOKEN = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
  withCredentials: true, // 쿠키(세션 ID)를 전달하기 위한 CORS 설정
});

export const AuthTokenInterceptor = ({children}) => {
  const navigate = useNavigate();

  // 유저의 로그인 여부를 관리하기 위한 전역상태변수
  const [, setUserLogin] = useRecoilState(userLoginAtom);
  // 유저의 정보들을 관리하기 위한 전역상태변수
  const [, setUserNickname] = useRecoilState(userNicknameAtom);
  const [, setUserProfile] = useRecoilState(userProfileAtom);

  useEffect(() => {
    requestAuthTokenInjector();
    requestRejectHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const requestAuthTokenInjector = () => {
    API_INSTANCE_TO_INJECT_TOKEN.interceptors.request.use((requestConfig) => {
      if(!requestConfig.headers) return requestConfig;

      let token = null;
      if(isRefreshTokenInURL(requestConfig.url)){
        token = getCookie("csrf_refresh_token");
      }
      else{
        token = getCookie("csrf_access_token");
      }
      if(!token){
        const error = new Error('다시 로그인을 해주세요.');
        resetUserData();
        return Promise.reject(error);
      }
      requestConfig.headers['x-csrf-token'] = token;
      return requestConfig;
    });
  }

  const isRefreshTokenInURL = (url) => {
    if(url === REFRESH_URL) return true;
    return false;
  }

  const requestRejectHandler = () => {
    API_INSTANCE_TO_INJECT_TOKEN.interceptors.response.use(
      (res) => res,
      async(err) => {
        // Network Error
        if(!err.response?.status) return Promise.reject(err);

        const {config, response: {status}} = err;

        if(config.url === REFRESH_URL){
          toast.info("다시 로그인을 해주세요.");
          resetUserData();
          return Promise.reject(err);
        }

        if(status === 401){
          await jwt_refresh_api()
          return API_INSTANCE_TO_INJECT_TOKEN(config);
        }

        return Promise.reject(err);
      }
    );
  }

  const resetUserData = () => {
    setUserLogin(false);
    setUserNickname("");
    setUserProfile("");
    navigate("/");
  }

  return children;
}