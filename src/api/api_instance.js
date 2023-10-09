import axios from "axios";
import {jwt_refresh_api} from "./jwt";
import {REFRESH_URL} from "../constants/apiConst";
import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {userLoginAtom, userNicknameAtom, userProfileAtom} from "../store/userAtom";
import {useNavigate} from "react-router-dom";
import {getCookie} from "../utils/useCookie";

export const API_INSTANCE = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
  withCredentials: true, // 쿠키(세션 ID)를 전달하기 위한 CORS 설정
});

export const API_INSTANCE_WITH_TOKEN = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
  withCredentials: true, // 쿠키(세션 ID)를 전달하기 위한 CORS 설정
});

export const Interceptor = ({children}) => {
  const navigate = useNavigate();
  const [, setUserLogin] = useRecoilState(userLoginAtom);
  const [, setUserNickname] = useRecoilState(userNicknameAtom);
  const [, setUserProfile] = useRecoilState(userProfileAtom);

  useEffect(() => {
    // TOKEN을 실어서 보내는 API 요청일 경우, request를 보내기 전에 헤더에 토큰을 넣어줌.
    API_INSTANCE_WITH_TOKEN.interceptors.request.use((config) => {
      if(!config.headers) return config;

      let token = null;
      if(config.url === REFRESH_URL){
        token = getCookie("csrf_refresh_token");
      }
      else{
        token = getCookie("csrf_access_token");
      }
      config.headers['x-csrf-token'] = token;
      return config;
    });

    // 응답 결과가 실패이고 Access Token이 만료일 경우 refresh api를 호출하여 토큰을 갱신한 후 다시 api를 호출함.
    API_INSTANCE_WITH_TOKEN.interceptors.response.use(
      (res) => res,
      async(err) => {
        const {config, response: {status}} = err;

        if (config.url === REFRESH_URL || status !== 401 || config.sent) {
          if (status === 401) {
            setUserLogin(false);
            setUserNickname("");
            setUserProfile("");
            navigate("/");
          }
          return Promise.reject(err);
        }

        config.sent = true;
        let accessToken = null;
        try {
          accessToken = await jwt_refresh_api();
        }
        catch (err) {
          return Promise.reject(err);
        }
        if(accessToken) {
          config.headers['x-csrf-token'] = accessToken;
        }
        return API_INSTANCE_WITH_TOKEN(config);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return children;
}