import axios from "axios";

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

export function apiInstanceWithoutToken(){
  API_INSTANCE.defaults.headers['x-csrf-token'] = null;
  return API_INSTANCE;
}

// jwt_required() api일 때 사용
export function apiInstanceForAccess() {
  API_INSTANCE.defaults.headers['x-csrf-token'] = getCookie("csrf_access_token");
  return API_INSTANCE;
}

// jwt_required(refresh=True) api 일때 사용
export function apiInstanceForRefresh(){
  API_INSTANCE.defaults.headers['x-csrf-token'] = getCookie("csrf_refresh_token"); // 액세스 토큰 발급용
  return API_INSTANCE;
}

