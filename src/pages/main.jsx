import React from "react";
import MainImage from "../assets/pexels-tima-miroshnichenko.jpg";
import style from "../styles/main.module.css";
import {useTitle} from "../utils/useTitle";
import {SERVICE_TITLE} from "../constants/serviceConst";
import {ScrollToTop} from "../utils/scrollRestoration";
import TypeIt from "typeit-react";
import {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {userLoginAtom} from "../store/userAtom";
import {oauth_url_api} from "../api/jwt";
import {roomIdAtom} from "../store/interviewRoomAtom";

function FirstSection(props){
  return (
    <div style={{width: "100%", textAlign:"center"}}>
      <TypeIt className={`${style.title_header}`} options={{speed: 30}}>
        <div>아직도 면접에 </div>
        <div style={{marginLeft:"5px", color:"#9a3838"}}>두려움</div>
        <div>을 느끼고 계신가요?</div>
      </TypeIt>
      <img className={`fadeInUpEffect animation-delay-1`} src={MainImage} alt="main" style={{width:"100%", marginBottom:"2em"}} />
      {/* <div className={`fadeInUpEffect animation-delay-2 ${style.title_content}`}>
        더 이상 면접 질문에 당황하지 마세요!
        <br/>
        면접자의 자소서와 원하는 회사의 채용 공고를 분석하여 개인화된 질문 리스트를 제공합니다. 현실감 넘치는 면접 시뮬레이션을 통해 진짜 면접에 대비하세요.
      </div> */}
      <div className={`line fadeInUpEffect animation-delay-3`} />
      <div className={`fadeInUpEffect animation-delay-3 ${style.title_content_start}`}>
      </div>
      <div className={`fadeInUpEffect animation-delay-3`}>
        {!props.userLogin ?
          <div>
            <div className={`${style.title_content_start}`}>
              <div>시작을 위해서는 계정이 필요합니다.</div>
              <div>카카오 계정으로 로그인하실 수 있습니다.</div>
            </div>
            <button
              className={`blackButton`}
              style={{marginTop: "15px", marginBottom:"15px", width:"150px", borderRadius: "10px"}}
              onClick={(e) => props.handleLogin(e)}
            >
              카카오 로그인
            </button>
          </div> :
          <div>
            <div className={`${style.title_content_start}`}>
              <div>정보를 입력하고 시작버튼을 누르시면,</div>
              <div>AI가 내용을 분석하고 질문을 생성합니다.</div>
            </div>
            <button
              className={`blackButton`}
              style={{marginTop: "15px", marginBottom:"15px", width:"150px", borderRadius: "10px"}}
              onClick={(e) => props.handleButtonClick(e)}
            >
              {"면접시작 >"}
            </button>
          </div>
        }
      </div>
    </div>
  );
}

function SecondSection(){

  const featureComponent = (title, description) => {
    return (
      <div className={`${style.feature_box}`}>
        <div className={`${style.feature_box_header}`}>{title}</div>
        <div className={`${style.feature_box_content}`}>{description}</div>
      </div>
    );
  }

  return (
    <div style={{width:"100%"}}>
      <h1 className={`${style.feature_header}`}>핵심기능 소개</h1>
      <div className={`layout-flex-grid-2`}>
        {featureComponent("자소서 및 채용 공고 분석", "면접자의 자소서와 원하는 회사의 채용 공고를 꼼꼼하게 분석합니다. 이 분석을 통해, 어떠한 질문도 예상하고 준비할 수 있게 도와줍니다.")}
        {featureComponent("개인화된 질문 리스트 생성", "분석된 결과를 토대로, 개인화된 질문 리스트를 제공합니다. 이를 통해 면접에서 당황하지 않고, 실제 면접에서 자주 묻는 질문에 대해 미리 준비할 수 있게 합니다.")}
        {featureComponent("현실감 있는 면접 시뮬레이션", "실제 면접을 대비하기 위한 현실감 넘치는 면접 시뮬레이션을 제공합니다. 이 시뮬레이션은 사용자가 실제 면접 상황을 체험하고, 면접 과정에서 발생할 수 있는 다양한 변수들에 대비할 수 있게 해줍니다.")}
        {featureComponent("면접 키워드 중심 면접 연습", "직무 기술 면접에서 나올 수 있는 키워드를 반복 연습해서 합격률을 높여봐요!")}

      </div>
    </div>
  );
}

function Main(){
  useTitle(`${SERVICE_TITLE}`);
  ScrollToTop();
  const navigate = useNavigate();
  const [, setRoomID] = useRecoilState(roomIdAtom);
  const [userLogin, ] = useRecoilState(userLoginAtom);

  const handleButtonClick = (e) => {
    e.preventDefault();
    setRoomID("modeSelect");
    navigate("/room");
  }

  const handleLogin = async () => {
    await oauth_url_api()
    .then((res) => {
      window.location.href = res.data["kakao_oauth_url"];
    })
    .catch((err) => {
    });
  };

  return (
    <section style={{flex: 1, paddingTop:"0px"}}>
      <section style={{backgroundColor:"#f4f7fb"}}>
        <div className={`container`} style={{flexDirection:"column"}}>
          <FirstSection userLogin={userLogin} handleLogin={handleLogin} handleButtonClick={handleButtonClick} />
        </div>
      </section>
      <section style={{backgroundColor:"#ffffff"}}>
        <div className={`container fadeInUpEffect animation-delay-4`} style={{flexDirection:"column"}}>
          <SecondSection />
        </div>
      </section>
    </section>
  );
}

export default Main;