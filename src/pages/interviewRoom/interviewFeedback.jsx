import React, { useEffect, useState } from 'react';
import "chart.js/auto";
// import { Radar } from "react-chartjs-2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { feedback_api } from "../../api/interview";
import { useRecoilState } from "recoil";
import { interviewDataAtom, interviewIdAtom, interviewResultAtom } from "../../store/interviewRoomAtom";
import { ScrollToTop } from "../../utils/scrollRestoration";
import { FEEDBACK_RANGE_DEFAULT_VALUE } from "../../constants/interviewFeedbackConst";
import style from "../../styles/interviewFeedback.module.css";

// function RadarChart({labels, datasets}) {
//   const data = {
//     labels: labels,
//     datasets: [
//       {
//         data: datasets,
//         backgroundColor: "rgba(0, 123, 255, 0.25)",
//         borderColor: "rgb(0,123,255)",
//         borderWidth: 1,
//         label: "내 평균점수"
//       },
//       // {
//       //   data: [4, 4, 4, 3, 5],
//       //   backgroundColor: "rgba(110,110,110, 0.25)",
//       //   borderColor: "rgb(110,110,110)",
//       //   borderWidth: 1,
//       //   label: "평균 점수"
//       // },
//     ],
//   };
//
//   const options = {
//     responsive: true, // 차트 크기가 컨테이너의 크기에 반응하도록 활성화합니다.
//     maintainAspectRatio: false, // 종횡비를 유지하지 않도록 설정합니다.
//     scale: {
//       ticks: { beginAtZero: true, display:false },
//       r: {
//         min: 0, max: 100,
//         ticks: { stepSize: 20 },
//       }
//     },
//   }
//
//   return (
//     <Radar
//       data={data}
//       options={options}
//     />
//   );
// }

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
  const [interviewResults, ] = useRecoilState(interviewResultAtom);
  const [interviewId, ] = useRecoilState(interviewIdAtom);
  const [interviewRecords, setInterviewRecords] = useState([]);
  const [interviewFeedbacks, setInterviewFeedbacks] = useState([]);

  // const questionCount = GetQuestionCount(interviewRecords);

  function handleFeedbackChange(index, value){
    const newFeedbacks = [...interviewFeedbacks];
    newFeedbacks[index] = value;
    setInterviewFeedbacks(newFeedbacks);
  }

  function handleEndButtonClick(e) {
    e.preventDefault();
    feedback_api({
      interview_id: interviewId,
      question_ids: interviewRecords.map(record => record.question_id),
      feedback_scores: interviewFeedbacks
    }).then(() => {
      alert(`면접이 종료되었습니다.`);
      navigate("/");
    })
    .catch(err => toast.error(`오류가 발생했습니다!\n${err.message}`, {}));
  }

  useEffect(() => {
    setInterviewRecords(interviewResults.interviewResults);
    setInterviewFeedbacks(new Array(interviewResults.interviewResults.length).fill(FEEDBACK_RANGE_DEFAULT_VALUE));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <section style={{backgroundColor:"#f4f7fb", flex:1}}>
      <div className={`container`} style={{flexDirection:"column"}}>
        {/* 타이틀 컴포넌트 */}
        <div className={`fadeInUpEffect`}>
          <div className={`${style.header}`}>{interviewData.interviewTargetCompany} 가상면접 결과</div>
          <div className={`${style.sub_header}`}>{interviewData.interviewTargetPosition}</div>
        </div>
        {/*<div className={`fadeInUpEffect animation-delay-1 ${style.radar_chart_box}`}>*/}
        {/*  <div className={`${style.radar_chart}`}>*/}
        {/*    <RadarChart labels={interviewResults.categories} datasets={interviewResults.categoryAverages} />*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className={`layout-flex-grid-2`} style={{marginTop:"1.5em"}}>
          {interviewRecords.map((record, index) => (
            <div key={index} className={`fadeInUpEffect ${style.record_box}`} style={{animationDelay:`${0.4 + index*0.4}s`}}>
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
                  <span>장점 분석<br/>{record.analysis[0]}<br/><br/>단점 분석<br/>{record.analysis[1]}</span>
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
        <div className={`fadeInUpEffect ${style.feedback_end_button}`} style={{display:"flex", justifyContent:"center", animationDelay:`${0.4 + interviewRecords.length*0.4}s`}}>
          <button className={`blueButton`} style={{borderRadius:"10px", width:"100%"}} onClick={(e) => handleEndButtonClick(e)}>면접종료</button>
        </div>
      </div>
    </section>
  )
}

export default InterviewFeedback;