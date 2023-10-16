import mem from 'mem';
import {API_INSTANCE, API_INSTANCE_TO_INJECT_TOKEN} from "./api_instance";


export const userinfo_api = async() => {
  return await API_INSTANCE.get("/interview/userinfo")
  .then(response => response)
  .catch(error => {
    throw error;
  });
}

// mem은 처음 요청된 refresh api를 일정시간 memoization 합니다.
// memoization된 시간동안 추가적으로 요청되는 refresh 요청들은 재사용됩니다.
// 이를 통해, refresh 요청이 한번에 여러번 와도 한번만 Token이 갱신됩니다.
export const jwt_refresh_api = mem(async() => {
  return await API_INSTANCE_TO_INJECT_TOKEN.post("/interview/token/refresh")
  .then(response => response)
  .catch(error => {
    throw error;
  });
}, {maxAge: 1000})

export const jwt_token_remove_api = async() => {
  return await API_INSTANCE.post("/interview/token/remove")
  .then(response => response)
  .catch(error => {
    throw error;
  });
}

export const oauth_url_api = async() => {
  return await API_INSTANCE.get("/interview/oauth/url")
  .then(response => response)
  .catch(error => {
    throw error;
  })
}