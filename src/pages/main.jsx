import InterviewButton from "../components/interviewButton";
import MainImage from "../assets/recruitment-6838250_1920.png";
import style from "../styles/main.module.css";
import {useTitle} from "../utils/useTitle";
import {SERVICE_TITLE} from "../constants/serviceConst";
import {ScrollToTop} from "../utils/scrollRestoration";

function firstSection(){
  return (
    <div style={{width: "100%", textAlign:"center"}}>
      <div className={`fadeInUpEffect ${style.title_header}`}>
        <div>아직도 면접에 </div>
        <div style={{marginLeft:"5px", color:"#9a3838"}}>두려움</div>
        <div>을 느끼고 계신가요?</div>
      </div>
      <div className={`fadeInUpEffect animation-delay-1 ${style.title_content}`}>
        <div>더 이상 면접 질문에 당황하지 마세요!</div>
        <div>면접자의 자소서와 원하는 회사의 채용 공고를 분석하여, 어떠한 질문도 놀라지 않고 대응할 수 있는 개인화된 질문 리스트를 제공합니다. 현실감 넘치는 면접 시뮬레이션을 통해 진짜 면접에 대비하세요.</div>
      </div>
      <img className={`fadeInUpEffect animation-delay-2`} src={MainImage} alt="main" style={{width:"100%", marginTop:"2em"}} />
      <div className={`fadeInUpEffect animation-delay-3 ${style.title_content_start}`}>
        <div>시작을 위해서는 계정이 필요합니다.</div>
        <div>지금은 구현되어 있지 않습니다.</div>
      </div>
      <div className={`fadeInUpEffect animation-delay-3`}>
        <InterviewButton text={"면접시작 >"} style={{marginTop: "15px", marginBottom:"15px", width:"150px", borderRadius: "10px"}} />
      </div>
    </div>
  );
}

function secondSection(){

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
        {featureComponent("개인화된 역량 매칭", "나의 경험과 역량이 회사의 요구사항과 어떻게 연결될 수 있는지를 명확하게 이해하도록 도와줍니다. 이를 통해 더 효과적으로 자신의 역량을 강조하고, 회사가 원하는 인재상에 부합하는지 확인할 수 있습니다.")}
        {featureComponent("현실감 있는 면접 시뮬레이션", "실제 면접을 대비하기 위한 현실감 넘치는 면접 시뮬레이션을 제공합니다. 이 시뮬레이션은 사용자가 실제 면접 상황을 체험하고, 면접 과정에서 발생할 수 있는 다양한 변수들에 대비할 수 있게 해줍니다.")}
      </div>
    </div>
  );
}

function Main(){
  useTitle(`${SERVICE_TITLE}`);
  ScrollToTop();

  return (
    <section style={{flex: 1}}>
      <section style={{backgroundColor:"#f4f7fb"}}>
        <div className={`container`} style={{flexDirection:"column"}}>
          {firstSection()}
        </div>
      </section>
      <section style={{backgroundColor:"#ffffff"}}>
        <div className={`container fadeInUpEffect animation-delay-4`} style={{flexDirection:"column"}}>
          {secondSection()}
        </div>
      </section>
    </section>
  );
}

export default Main;