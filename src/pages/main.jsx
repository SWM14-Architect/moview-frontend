import React from "react";
import MainImage from "../assets/pexels-tima-miroshnichenko.webp";
import InterviewIcon from "../assets/free-icon-interview-7659465.png";
import MoviewPlayGif from "../assets/moview-play.gif";
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
import {toast} from "react-toastify";
import Accordion from "../components/accordion";
import HowToSelectMode from "../assets/howto/how-to-select-mode.png";
import HowToLight from "../assets/howto/how-to-light.png";
import HowToAddRequirements from "../assets/howto/how-to-add-req.png";
import HowToInput from "../assets/howto/how-to-input.jpeg";
import HowToChatType from "../assets/howto/how-to-chat-type.png";
import HowToChatMicOn from "../assets/howto/how-to-chat-mic-on.png";
import HowToChatMicOff from "../assets/howto/how-to-chat-mic-off.png";
import HowToChatMicEdit from "../assets/howto/how-to-chat-mic-edit.png";
import {Button} from "flowbite-react";

function FirstSection(props){
  return (
    <div className={`${style.first_section}`} style={{width: "100%", textAlign:"center"}}>
      <div>
        <h2 className="fadeInUpEffect text-base font-semibold leading-7 text-indigo-600">나만의 면접 연습 서비스, 모두의 인터뷰.</h2>
        <TypeIt className={`${style.title_header} mt-2 mx-auto max-w-3xl text-3xl sm:text-4xl font-bold ][`} options={{speed: 30}} style={{lineHeight:"1em"}}>
          <div>직무 면접, 모뷰에서 </div>
          <div style={{marginLeft:"5px", color:"#ff5e5e"}}>무료</div>
          <div>로 연습해보세요.</div>
        </TypeIt>
      </div>
      <img src={MainImage} className={`fadeInUpEffect animation-delay-1`} alt="main" style={{width:"100%", borderRadius:"20px"}} />
      <div>
        <div className={`fadeInUpEffect animation-delay-3 mb-10`}>
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
              <div className="relative m-auto">
                <button
                  className={`blackButton`}
                  style={{marginTop: "15px", marginBottom:"15px", width:"150px", borderRadius: "10px"}}
                  onClick={(e) => props.handleButtonClick(e)}
                >
                  {"면접시작 >"}
                </button>
                <div className={`${style.free_div} absolute animate-bounce text-white` } style={{top:"15px", left:"47%"}}>FREE</div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

function SecondSection(){
  return (
    <div className={`${style.second_section} bg-white sm:py-16 mb-10`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">취업의 최종 관문, 면접.</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            아직도 면접에 두려움을 느끼고 계신가요?
          </p>
        </div>
        <div className="flex flex-col sm:flex-row mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl" style={{}}>
          <img src={MoviewPlayGif} loading="lazy" alt={"Moview"} style={{borderRadius:"10px", maxWidth:"30em"}} />
          <div className="sm:pl-6 pt-4 w-full">
            <div className="flex flex-row">
              <img className="my-auto ml-2" src={InterviewIcon} loading="lazy" alt={"Icon"} style={{width:"40px", height:"40px"}} />
              <p className="text-xl font-bold tracking-tight sm:text-2xl mb-4">LLM AI를 활용한<br/>나만의 맞춤형 면접 서비스</p>
            </div>
            <p className="leading-7 tracking-tight">지원하고자 하는 회사의 채용공고와 자기소개서를 넣으면, 일반적인 면접 질문이 아닌 나에게 맞춰진 질문을 제공합니다!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    name: '자소서 및 채용 공고 분석',
    description:
      '면접자의 자소서와 면접자가 원하는 회사의 채용 공고를 AI 기반으로 분석합니다. 이 분석을 통해, 어떠한 질문도 예상하고 준비할 수 있게 도와줍니다.',
  },
  {
    name: '개인화된 질문 리스트 생성',
    description:
      '분석된 결과를 토대로, 개인화된 질문 리스트를 제공합니다. 이를 통해 면접에서 당황하지 않고, 실제 면접에서 자주 묻는 질문에 대해 미리 준비할 수 있게 합니다.',
  },
  {
    name: '꼬리 질문 완벽 대비',
    description:
      '자신의 답변에 무슨 꼬리 질문이 나올 지 고민이신가요? 걱정마세요! 저희 서비스, 모뷰는 답변의 상황과 문맥에 따라 적절한 꼬리 질문을 출제해준답니다!',
  },
  {
    name: '면접 키워드 중심 면접 연습',
    description:
      '직무 기술 면접에서 나올 수 있는 키워드를 반복 연습해서 합격률을 높이고, 면접관들을 깜짝 놀라게 해봅시다!',
  },
]

function ThirdSection(){
  return (
    <div className={`${style.third_section} bg-white py-12 sm:py-16 h-full`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">곧 면접을 보러 가시나요?</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            다가오는 면접 날짜에 더 이상 두려워하지 마세요.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600">
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

const howto_features = [
  {
    title: "모드 선택",
    content: "연습 모드, 실전 모드 중 하나를 선택하세요.",
    source: HowToSelectMode,
  },
  {
    title: "연습 모드 입력 예시",
    content: "다음 예시처럼 작성해주시면 됩니다.",
    source: HowToLight,
  },
  {
    title: "실전 모드에서 자소서 추가하는 방법",
    content : "+ 버튼을 클릭하시면 됩니다. 최대 3개까지 입력 가능합니다.",
    source: HowToAddRequirements,
  },
  {
    title: "실전 모드 입력 예시",
    content: "다음 예시처럼 작성해주시면 됩니다.",
    source: HowToInput,
  },
  {
    title: "면접 입력 텍스트로 하는 방법",
    content: "다음 예시처럼 작성해주시면 됩니다.",
    source: HowToChatType,
  },

  {
    title: "마이크 키는 방법",
    content: "다음 아이콘을 클릭하십시오.",
    source: HowToChatMicOn,
  },
  {
    title: "면접 입력 시 마이크 사용하는 방법",
    content: "다음 아이콘인 상태에서 말을 하십시오. 그리고 말을 마치면 마이크 아이콘을 클릭하십시오.",
    source: HowToChatMicOff,
  },
  {
    title: "음성 인식된 문장 수정하는 방법",
    content: "다음 영역을 직접 텍스트로 수정하면 됩니다.",
    source: HowToChatMicEdit,
  }
];

function HowotoSection(){
  return (
    <section>
      <div className={`container`} style={{ flexDirection: "column" }}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">How To.</h2>
          <p className="mt-2 mb-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            이 서비스를 사용하는 방법
          </p>
        </div>
        <div>
          {howto_features.map((feature, index) => (
            <div key={index}>
              <Accordion
                index={index}
                title={feature.title}
                content={feature.content}
                source={feature.source}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
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
      toast.error(`${err.response?.data.message ? err.response.data.message.error : "오류가 발생했습니다!\n" + err.message}`, {});
    });
  };

  return (
    <section style={{flex: 1, paddingTop:"0px"}}>
      <section>
        <section style={{backgroundColor:"white"}}>
          <div className={`container`} style={{flexDirection:"column"}}>
            <FirstSection userLogin={userLogin} handleLogin={handleLogin} handleButtonClick={handleButtonClick} />
          </div>
        </section>
        <section>
          <div className={`container fadeInUpEffect animation-delay-2`} style={{flexDirection:"column"}}>
            <SecondSection />
          </div>
        </section>
        <section>
          <ThirdSection/>
        </section>
        <section>
          <HowotoSection />
        </section>
      </section>
    </section>
  );
}

export default Main;