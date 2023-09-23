import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {jwt_refresh_api, jwt_token_remove_api, userinfo_api} from "./api/jwt";
import {useRecoilState} from "recoil";
import {userLoginAtom, userNicknameAtom, userProfileAtom} from "./store/userAtom";


function JWT(){
  const location = useLocation();
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useRecoilState(userLoginAtom);
  const [, setUserNickname] = useRecoilState(userNicknameAtom);
  const [, setUserProfile] = useRecoilState(userProfileAtom);

  const checkLogin = async () => {
    console.log("checkLogin");
    return userinfo_api()
    .then((res) => {
      setUserLogin(true);
      setUserNickname(res.data["profile_nickname"]);
      setUserProfile(res.data["profile_image_url"]);
    })
    .catch(async(err) => {
      // console.log(err);
      if(!err.response){
        console.log("user not found");
      }
      else if(err.response.data["msg"] === 'Missing cookie "access_token_cookie"'){
        console.log('Missing cookie "access_token_cookie"');
      }
      else if (err.response.data["msg"] === "Token has expired") {
        await refreshTokenInChecking();
        return;
      }
      if(window.location.pathname === "/room") {
        alert("비정상적인 접근입니다!");
        navigate("/");
      }
      if(userLogin) {
        setUserLogin(false);
        setUserNickname("");
        setUserProfile("");
      }
      return;
    });
  };

  const refreshTokenInChecking = async () => {
    return jwt_refresh_api()
    .then(async(res) => {
      if (res.data.result) {
        // 액세스 토큰이 갱신됬으므로 autoLogin을 호출합니다.
        await checkLogin();
      } else {
        //리프레시 토큰 만료도 아니고 액세스 토큰도 갱신 안되면, 토큰 삭제.
        await jwt_token_remove_api();
        setUserLogin(false);
        setUserNickname("");
        setUserProfile("");
        alert("로그인을 다시 해주세요!");
        navigate("/");
        return;
      }
    })
    .catch(() => {});
  };

  useEffect(() => {
    checkLogin();
  }, [location]);
}

export default JWT;