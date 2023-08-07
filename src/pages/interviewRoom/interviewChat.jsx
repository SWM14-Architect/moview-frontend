import React, {useCallback, useRef, useState} from "react";
import style from "../../styles/interviewChat.module.css";
import {useRecoilState} from "recoil";
import {interviewDataAtom, interviewResultAtom, roomIdAtom} from "../../store/interviewRoomAtom";
import AIProfileImage from "../../assets/free-icon-man-4086624-p-500.png";
import HumanProfileImage from "../../assets/free-icon-man-3884851-p-500.png";
import TypeIt from "typeit-react";
import {useInterval} from "../../utils/useInterval";
import {ScrollToTop} from "../../utils/scrollRestoration";
import {chatHistoryAtom} from "../../store/interviewChatAtom";
import {answer} from "../../api/interviewee";

function TextareaForm({placeholder, item, onChange}){
  const textRef = useRef(null);

  // Textarea height auto resize
  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  return (
    <textarea
      ref={textRef}
      className={`${style.input_form_textbox}`}
      placeholder={placeholder}
      onInput={handleResizeHeight}
      onChange={e => onChange(e)}
      value={item}
    />
  );
}

function InterviewChat(){
  ScrollToTop();
  const intervieweeAnswerRef = useRef(null);
  const [, setRoomID] = useRecoilState(roomIdAtom);
  const [interviewData, ] = useRecoilState(interviewDataAtom);
  const [chatHistory, setChatHistory] = useRecoilState(chatHistoryAtom); // 채팅내역
  const [, setInterviewResult] = useRecoilState(interviewResultAtom); // 인터뷰 결과
  const [isTyping, setIsTyping] = useState(null);
  const [intervieweeAnswer, setIntervieweeAnswer] = useState(""); //
  const [interviewTurn, setInterviewTurn] = useState(false); // [false: AI 질문 중 true: Interviewee 답변 가능]
  const [interviewFlag, setInterviewFlag] = useState(false); // [false: 인터뷰 진행 중 true: 인터뷰 종료]

  const canNotPlayerTalking = () => {
    if(intervieweeAnswer === "" || interviewTurn === false || isTyping !== null) return true;
    return false;
  }

  const handleIntervieweeAnswerButton = (e, answerContent) => {
    e.preventDefault();
    if(canNotPlayerTalking()) return;

    setChatHistory([...chatHistory, {type:"Human", content: answerContent}]);
    setIntervieweeAnswer("");
    intervieweeAnswerRef.current.scrollIntoView({behavior: "smooth"});
  }

  const handleInterviewerQuestion = (e, questionContent) => {
    // e.preventDefault();
    const question = {type:"AI", content: questionContent};
    setChatHistory([...chatHistory, question]);
  }

  // 1초마다 입력이 완료되었는지 체크합니다.
  useInterval(() => {
    if(isTyping !== null && isTyping.instance.is("completed")){
      if(isTyping.type === "AI"){
        // AI의 질문이 완료되었을 때, 인터뷰어가 답변을 입력할 수 있도록 합니다.
        setInterviewTurn(true);
      }
      else{
        // 유저의 답변이 완료되었을 때,
        answer({answer: chatHistory[isTyping.index].content})
        .then((res) => {
          if(res.message.flag === "InterviewerActionEnum.END_INTERVIEW") {
            // INTERVIEW_END, 결과 페이지로 이동합니다.
            handleInterviewerQuestion(null, "수고하셨습니다! 면접은 여기서 종료하겠습니다.");
            setInterviewFlag(true);
            setInterviewResult(res.message.content); // 결과내용을 interviewResultAtom에 저장합니다.
          }
          else{
            // NEXT_QUESTION, 다음 질문을 받아옵니다.
            handleInterviewerQuestion(null, res.message.content);
          }
        })
        .catch((err) => {
          handleInterviewerQuestion(null, "에러가 발생했네요.");
          console.log(err);
        });
      }
      setIsTyping(null);
      return;
    }
  }, 1000, isTyping);

  return (
    <section style={{backgroundColor:"#f4f7fb", flex:1}}>
      <div className={`container`} style={{flexDirection:"column"}}>
        {/* 타이틀 컴포넌트 */}
        <div className={`fadeInUpEffect`}>
          <div className={`${style.header}`}>{interviewData.interviewTargetCompany} 가상면접</div>
          <div className={`${style.sub_header}`}>{interviewData.interviewTargetPosition}</div>
        </div>
        {/* 인터뷰 채팅 히스토리 컴포넌트 */}
        {chatHistory.map((item, index) => (
          <div key={index} className={`${style.chat_box} fadeInUpEffect`}>
            <div className={`${style.profile_box} ${item.type === "AI" ? null : style.profile_back}`}>
              <img src={item.type === "AI" ? AIProfileImage : HumanProfileImage} className={`${style.profile_image}`} alt={"profile"}/>
              <span>{item.type === "AI" ? "AI면접관" : "나"}</span>
            </div>
            {/* 마지막 대화 컴포넌트만 TypeIt으로 렌더링해서
                새로고침했을 때 모든 대화에 TypeIt 효과가 적용되는 현상을 방지함. */}
            { chatHistory.length-1 === index ?
              <TypeIt
                className={`${style.chat_message}`}
                options={{speed: 40}}
                getBeforeInit={(instance) => {
                  // 마지막 대화에 대해서만 typing을 체크합니다.
                  if(index === chatHistory.length-1) {
                    setIsTyping({index: index, type:item.type, instance:instance});
                  }
                  setInterviewTurn(false);
                  return instance;
                }}
              >
                {item.content}
              </TypeIt> :
              <span className={`${style.chat_message}`}>
                {item.content}
              </span>
            }
          </div>
        ))}
        {/* 답변 작성 컴포넌트 */}
        {interviewFlag === false ?
          <div ref={intervieweeAnswerRef} className={`${style.input_form} fadeInUpEffect animation-delay-1`}>
            <TextareaForm
              placeholder={"질문에 대한 답변을 작성하세요."}
              item={intervieweeAnswer}
              onChange={(e) => {setIntervieweeAnswer(e.target.value)}}
            />
            <button
              className={`${style.input_form_button} ${canNotPlayerTalking() ? style.input_form_disabled : null}`}
              onClick={(e) => handleIntervieweeAnswerButton(e, intervieweeAnswer)}
            >
              답변 제출하기
            </button>
          </div> :
          <div className={`${style.input_form}`}>
            <button
              className={`${style.input_form_button} ${style.result_form_button}`}
              onClick={() => setRoomID("interviewFeedback")}
            >
              결과 확인하기
            </button>
          </div>
        }
      </div>
    </section>
  );
}

export default InterviewChat;