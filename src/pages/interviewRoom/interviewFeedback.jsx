import React, {useEffect, useState} from 'react';
import style from "../../styles/interviewFeedback.module.css";
import {useRecoilState} from "recoil";
import {interviewDataAtom} from "../../store/room_atom";
import "chart.js/auto";
import { Radar } from "react-chartjs-2";
import {FEEDBACK_RANGE_DEFAULT_VALUE} from "../../constants/interviewFeedbackConst";
import {useNavigate} from "react-router-dom";
import {ScrollToTop} from "../../utils/scrollRestoration";

function RadarChart() {
  const data = {
    labels: [
      "Behavioral Questions",
      "Situational Questions",
      "Technical Job-related Questions",
      "Cultural Fit Questions",
      "Personal Character Questions",
    ],
    datasets: [
      {
        data: [4, 3, 5, 2, 4],
        backgroundColor: "rgba(0, 123, 255, 0.25)",
        borderColor: "rgb(0,123,255)",
        borderWidth: 1,
        label: "내 점수"
      },
      {
        data: [4, 4, 4, 3, 5],
        backgroundColor: "rgba(110,110,110, 0.25)",
        borderColor: "rgb(110,110,110)",
        borderWidth: 1,
        label: "평균 점수"
      },
    ],
  };

  const options = {
    responsive: true, // 차트 크기가 컨테이너의 크기에 반응하도록 활성화합니다.
    maintainAspectRatio: false, // 종횡비를 유지하지 않도록 설정합니다.
    scale: {
      ticks: { beginAtZero: true, display:false },
      r: {
        min: 0, max: 5,
        ticks: { stepSize: 1 },
      }
    },
  }

  return (
    <Radar
      data={data}
      options={options}
    />
  );
}

function GetQuestionCount(recrods){
  const total_question = recrods.length;
  const follow_up_question = recrods.filter(record => record.follow_up_qeustion_id !== 0).length;
  const init_question = total_question - follow_up_question;
  return {total_question:total_question, init_question:init_question, follow_up_question:follow_up_question};
}

function SliderInput({name, index, onChange}){
  return (
    <form className={`${style.slider_form}`}>
      <input
        type="range"
        name={name}
        min={1}
        max={5}
        step={1}
        list="markers"
        defaultValue={FEEDBACK_RANGE_DEFAULT_VALUE}
        onMouseUp={e=> onChange(index, parseInt(e.target.value))}
        onTouchEnd={e=> onChange(index, parseInt(e.target.value))}
      />
      <datalist id="markers">
        <option value="1" label="1점"></option>
        <option value="2" label="2점"></option>
        <option value="3" label="3점"></option>
        <option value="4" label="4점"></option>
        <option value="5" label="5점"></option>
      </datalist>
    </form>
  );
}

function InterviewFeedback(){
  ScrollToTop();
  const navigate = useNavigate();
  const [interviewData, ] = useRecoilState(interviewDataAtom);
  const [interviewRecords, setInterviewRecords] = useState([]);
  const [interviewFeedbacks, setInterviewFeedbacks] = useState([]);

  const questionCount = GetQuestionCount(interviewRecords);

  function handleFeedbackChange(index, value){
    const newFeedbacks = [...interviewFeedbacks];
    newFeedbacks[index] = value;
    setInterviewFeedbacks(newFeedbacks);
  }

  function handleEndButtonClick(e) {
    e.preventDefault();
    // TODO: API 호출 포인트
    alert(`면접이 종료되었습니다.\n${interviewFeedbacks}`);
    navigate("/");
  }

  useEffect(() => {
    const testData = [
      {init_question_id:1, follow_up_qeustion_id:0, question:"왜 이렇게 프로젝트를 잘 만드셨습니까?", answer:"팀빌딩할 때는 몰랐는데 다들 불도저였더라구요.", analysis:"팀분석이 정확했음.", score:55},
      {init_question_id:1, follow_up_qeustion_id:1, question:"팀원이 모두 불도저라고 생각했던 이유는 뭔가요?", answer:"주말에도 일해요. 무서워요. 물론 장난입니다. 하하.", analysis:"근거를 잘 이야기했고, 감정을 잘 표현함.", score:67},
      {init_question_id:2, follow_up_qeustion_id:0, question:"이 프로젝트는 주제가 뭔가요?", answer:"섹시한 가상면접 서비스.", analysis:"호우 좀 치는데?", score:100},

      {init_question_id:2, follow_up_qeustion_id:0, question:"이 프로젝트는 주제가 뭔가요?", answer:"섹시한 가상면접 서비스.", analysis:"호우 좀 치는데?", score:100},
      {init_question_id:1, follow_up_qeustion_id:0, question:"왜 이렇게 프로젝트를 잘 만드셨습니까?", answer:"팀빌딩할 때는 몰랐는데 다들 불도저였더라구요.", analysis:"팀분석이 정확했음.", score:55},
      {init_question_id:1, follow_up_qeustion_id:1, question:"팀원이 모두 불도저라고 생각했던 이유는 뭔가요?", answer:"주말에도 일해요. 무서워요. 물론 장난입니다. 하하.", analysis:"근거를 잘 이야기했고, 감정을 잘 표현함.", score:67},
    ];
    setInterviewRecords(testData);
    setInterviewFeedbacks(new Array(testData.length).fill(FEEDBACK_RANGE_DEFAULT_VALUE));
  }, []);

  return(
    <section style={{backgroundColor:"#f4f7fb", flex:1}}>
      <div className={`container`} style={{flexDirection:"column"}}>
        {/* 타이틀 컴포넌트 */}
        <div className={`fadeInUpEffect`}>
          <div className={`${style.header}`}>{interviewData.interviewTargetCompany} 가상면접 결과</div>
          <div className={`${style.sub_header}`}>{interviewData.interviewTargetPosition}</div>
        </div>
        <div className={`fadeInUpEffect animation-delay-1 ${style.radar_chart_box}`}>
          <div className={`${style.radar_chart}`}>
            <RadarChart />
          </div>
        </div>
        <div className={`layout-flex-grid-3`} style={{marginTop:"1.5em"}}>
          {interviewRecords.map((record, index) => (
            <div key={index} className={`fadeInUpEffect ${style.record_box}`} style={{animationDelay:`${0.8 + index*0.4}s`}}>
              <div className={`${style.interview_box}`}>
                <div>
                  <span>질문</span>
                  <span>{record.question}</span>
                </div>
                <div>
                  <span>답변</span>
                  <span>{record.answer}</span>
                </div>
                <div>
                  <span>평가</span>
                  <span>{record.analysis}</span>
                </div>
                <div>
                  <span>점수</span>
                  <span>{record.score}점</span>
                </div>
              </div>
              <div className={`${style.feedback_box}`}>
                <div>
                  <span>적절한 면접 질문을 제공했나요?</span>
                  <SliderInput name={`question_${index}`} index={index} onChange={handleFeedbackChange}/>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={`fadeInUpEffect ${style.feedback_end_button}`} style={{display:"flex", justifyContent:"center", animationDelay:`${0.8 + interviewRecords.length*0.4}s`}}>
          <button className={`blueButton`} style={{borderRadius:"10px", width:"100%"}} onClick={(e) => handleEndButtonClick(e)}>면접종료</button>
        </div>
      </div>
    </section>
  )
}

export default InterviewFeedback;