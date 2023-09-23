import {apiInstanceForRefresh, apiInstanceWithoutToken} from "./api_instance";


export const userinfo_api = async() => {
  return await apiInstanceWithoutToken().get("/interview/userinfo")
  .then(response => response)
  .catch(error => {
    throw error;
  });
}

export const jwt_refresh_api = async() => {
  return await apiInstanceForRefresh().post("/interview/token/refresh")
  .then(response => response)
  .catch(error => {
    throw error;
  });
}

export const jwt_token_remove_api = async() => {
  return await apiInstanceWithoutToken().post("/interview/token/remove")
  .then(response => response)
  .catch(error => {
    throw error;
  });
}

export const oauth_url_api = async() => {
  return await apiInstanceWithoutToken().get("/interview/oauth/url")
  .then(response => response)
  .catch(error => {
    throw error;
  })
}