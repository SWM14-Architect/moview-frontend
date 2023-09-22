import axios from "axios";

const getCookie = (cookieName) => {
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

export const apiClientWithoutToken = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
  withCredentials: true, // 쿠키(세션 ID)를 전달하기 위한 CORS 설정
});

// jwt_required() api일 때 사용
export const apiClientForAccess = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
  withCredentials: true,
  headers: {
    "x-csrf-token": getCookie("csrf_access_token"),
  },
});

// jwt_required(refresh=True) api 일때 사용
export const apiClientForRefresh = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
  withCredentials: true,
  headers: {
    "x-csrf-token": getCookie("csrf_refresh_token"), // 새로운 액세스 토큰 발급용
  },
});
