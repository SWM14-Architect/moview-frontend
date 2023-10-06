import { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import ReactGA from "react-ga4";
import {useRecoilState} from "recoil";
import {userLoginAtom} from "./store/userAtom";
import {toast} from "react-toastify";
import {roomIdAtom} from "./store/interviewRoomAtom";

/**
 * uri 변경 추적 컴포넌트
 * uri가 변경될 때마다 pageview 이벤트 전송
 */
const RouteChangeTracker = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [initialized, setInitialized] = useState(false);
  const [userLogin, ] = useRecoilState(userLoginAtom);
  const [roomID, ] = useRecoilState(roomIdAtom);

  // 구글 애널리틱스 운영서버만 적용
  useEffect(() => {
    if (process.env.REACT_APP_GOOGLE_ANALYTICS) {
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
      setInitialized(true);
    }
  }, []);


  useEffect(() => {
    // 로그인하지 않은 상태일 때 특정 path 접근 제한
    if(!userLogin) {
      if (location.pathname === "/room") {
        toast.warn("비정상적인 접근입니다!", {});
        navigate("/");
      }
    }

    // location 변경 감지시 pageview 이벤트 전송
    if (initialized) {
      let pageview = location.pathname;
      if(pageview === "/room"){
        pageview = "/room/" + roomID;
      }
      ReactGA.set({ page: pageview });
      ReactGA.send("pageview");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized, location]);
};

export default RouteChangeTracker;