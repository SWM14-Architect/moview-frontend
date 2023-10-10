import React from "react";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loadingAtom, loadingMessageAtom } from "./store/loadingAtom";
import Header from "./components/header";
import Footer from "./components/footer";
import Loading from "./components/loading";
import RouteChangeTracker from "./RouteChangeTracker";
import {Interceptor} from "./api/api_instance";
import FeedbackModal from "./components/feedbackModal";

function App() {
  // 모든 화면에 공통된 부분을 처리하는 컴포넌트
  // <Outlet/>은 라우터가 연결된 컴포넌트를 표시하는 영역
  RouteChangeTracker();
  const [isLoading, ] = useRecoilState(loadingAtom);
  const [loadingMessage, ] = useRecoilState(loadingMessageAtom);
  return(
    <Interceptor>
      <div className={`wrapper`}>
        <div className={`contentWrapper`}>
          <Header/>
          <Outlet/>
        </div>
        <Footer/>
        {isLoading ? <Loading message={loadingMessage} isLoading={isLoading} /> : null}
        <FeedbackModal />
      </div>
    </Interceptor>
  )
}

export default App;