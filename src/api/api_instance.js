import axios from "axios";
import {jwt_refresh_api} from "./jwt";
import {REFRESH_URL} from "../constants/apiConst";

export const getCookie = (cookieName) => {
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

export const API_INSTANCE = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
  withCredentials: true, // 쿠키(세션 ID)를 전달하기 위한 CORS 설정
});

export const API_INSTANCE_WITH_TOKEN = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
  withCredentials: true, // 쿠키(세션 ID)를 전달하기 위한 CORS 설정
});

// TOKEN을 실어서 보내는 API 요청일 경우, request를 보내기 전에 헤더에 토큰을 넣어줌.
export const API_INSTANCE_WITH_TOKEN_INTERCEPTER_REQUEST = API_INSTANCE_WITH_TOKEN.interceptors.request.use((config) => {
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
