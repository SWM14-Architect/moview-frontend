import {Outlet} from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";

function App(){
  // 모든 화면에 공통된 부분을 처리하는 컴포넌트
  // <Outlet/>은 라우터가 연결된 컴포넌트를 표시하는 영역
  return(
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App;