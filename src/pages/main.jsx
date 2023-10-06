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
      <div className={`line fadeInUpEffect animation-delay-3`} />
      <div className={`fadeInUpEffect animation-delay-3 ${style.title_content_start}`}>
      </div>
    </div>
  );
}

const features = [
  {
    name: '자소서 및 채용 공고 분석',
    description:
      '면접자의 자소서와 원하는 회사의 채용 공고를 꼼꼼하게 분석합니다. 이 분석을 통해, 어떠한 질문도 예상하고 준비할 수 있게 도와줍니다.',
  },
  {
    name: '개인화된 질문 리스트 생성',
    description:
      '분석된 결과를 토대로, 개인화된 질문 리스트를 제공합니다. 이를 통해 면접에서 당황하지 않고, 실제 면접에서 자주 묻는 질문에 대해 미리 준비할 수 있게 합니다.',
  },
  {
    name: '현실감 있는 면접 시뮬레이션',
    description:
      '실제 면접을 대비하기 위한 현실감 넘치는 면접 시뮬레이션을 제공합니다. 이 시뮬레이션은 사용자가 실제 면접 상황을 체험하고, 면접 과정에서 발생할 수 있는 다양한 변수들에 대비할 수 있게 해줍니다.',
  },
  {
    name: '면접 키워드 중심 면접 연습',
    description:
      '직무 기술 면접에서 나올 수 있는 키워드를 반복 연습해서 합격률을 높이고, 면접관들을 깜짝 놀라게 해봅시다!',
  },
]

function SecondSection(){

  return (
    <div className="bg-white py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-indigo-600">취업의 최종 관문, 면접.</h2>
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
      <section style={{backgroundColor:"white"}}>
        <div className={`container`} style={{flexDirection:"column"}}>
          <FirstSection userLogin={userLogin} handleLogin={handleLogin} handleButtonClick={handleButtonClick} />
        </div>
      </section>
      <section style={{backgroundColor:"#ffffff"}}>
        <div className={`container fadeInUpEffect animation-delay-2`} style={{flexDirection:"column"}}>
          <SecondSection />
        </div>
      </section>
    </section>
  );
}

export default Main;