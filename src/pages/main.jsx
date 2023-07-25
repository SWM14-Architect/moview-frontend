import InterviewButton from "../components/interviewButton";
import MainImage from "../assets/pexels-fauxels-3182765_gnR1cf24-p-1080.webp";

function firstSection(){
  const headerStyle = {
    color: "#616161",
    fontFamily: "GmarketSansBold",
    fontSize: "28px",
    marginBottom: "20px",
    marginLeft: "20px",
    marginRight: "20px",
    wordBreak: "keep-all",
  }

  const contentStyle = {
    fontFamily: "NanumGothic",
    fontSize: "14px",
    marginLeft: "30px",
    marginRight: "30px",
    marginBottom: "20px",
    wordBreak: "keep-all",
  }

  return (
    <div style={{width:"100%", textAlign:"center"}}>
      <div style={headerStyle}>아직도 면접에 두려움을 느끼고 계신가요?</div>
      <div style={contentStyle}>취업 준비생분들, 더 이상 당황스럽게 질문에 답하지 않아도 됩니다. 저희 서비스는 당신의 자소서와 원하는 회사의 채용 공고를 분석하여, 어떠한 질문도 놀라지 않고 대응할 수 있는 개인화된 질문 리스트를 제공합니다. 이제는 당신의 경험과 역량이 회사의 요구사항과 어떻게 맞물리는지에 대한 명확한 이해를 바탕으로, 저희 서비스의 현실감 넘치는 면접 시뮬레이션을 통해 진짜 면접에 대비하세요.</div>
      <InterviewButton text={"면접시작"} style={{marginBottom:"15px"}} />
      <img src={MainImage} alt="image" style={{width:"100%"}} />
    </div>
  );
}

function secondSection(){
  const h1Style = {
    fontFamily: "GmarketSansBold",
    fontSize: "28px",
    marginLeft: "15px",
    marginBottom: "0px"
  }

  const featureComponent = (title, description) => {
    const boxStyle = {
      backgroundColor:"#f4f7fb",
      margin:"15px",
      padding:"20px",
      borderRadius: "10px",
    }

    const headerStyle = {
      fontFamily: "GmarketSansLight",
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "10px"
    }

    const contentStyle = {
      fontFamily: "NanumGothic",
      fontSize: "14px",
    }

    return (
      <div className={`layout-flex-row-item`} style={boxStyle}>
        <div style={headerStyle}>{title}</div>
        <div style={contentStyle}>{description}</div>
      </div>
    );
  }

  return (
    <div style={{width:"100%"}}>
      <h1 style={h1Style}>핵심기능</h1>
      <div className={`layout-flex-row`} style={{justifyContent:"space-around", flexWrap:"wrap"}}>
        {featureComponent("자소서 및 채용 공고 분석", "저희 서비스는 당신의 자소서와 원하는 회사의 채용 공고를 꼼꼼하게 분석합니다. 이 분석을 통해, 어떠한 질문도 예상하고 준비할 수 있게 도와드립니다.")}
        {featureComponent("개인화된 질문 리스트 생성", "분석된 결과를 토대로, 개인화된 질문 리스트를 제공합니다. 이를 통해 당신이 면접에서 당황하지 않고, 실제 면접에서 자주 묻는 질문에 대해 미리 준비할 수 있게 합니다.")}
        {featureComponent("개인화된 역량 매칭", "당신의 경험과 역량이 회사의 요구사항과 어떻게 연결될 수 있는지를 명확하게 이해하도록 도와줍니다. 이를 통해 더 효과적으로 자신의 역량을 강조하고, 회사가 원하는 인재상에 부합하는지 확인할 수 있습니다.")}
        {featureComponent("현실감 있는 면접 시뮬레이션", "마지막으로, 저희 서비스는 실제 면접을 대비하기 위한 현실감 넘치는 면접 시뮬레이션을 제공합니다. 이 시뮬레이션은 사용자가 실제 면접 상황을 체험하고, 면접 과정에서 발생할 수 있는 다양한 변수들에 대비할 수 있게 해줍니다.")}
      </div>
    </div>
  );
}

function Main(){
  return (
    <div>
      <section style={{backgroundColor:"#f4f7fb"}}>
        <div className={`container`} style={{flexDirection:"column"}}>
          {firstSection()}
        </div>
      </section>
      <section style={{backgroundColor:"#ffffff"}}>
        <div className={`container`} style={{flexDirection:"column"}}>
          {secondSection()}
        </div>
      </section>
    </div>
  );
}

export default Main;