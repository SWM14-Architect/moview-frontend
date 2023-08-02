import React, {useCallback, useEffect, useRef, useState} from "react";
import style from "../../styles/interviewChat.module.css";
import {useRecoilState} from "recoil";
import {interviewDataAtom, roomIdAtom} from "../../store/room_atom";
import AIProfileImage from "../../assets/free-icon-man-4086624-p-500.png";
import HumanProfileImage from "../../assets/free-icon-man-3884851-p-500.png";
import TypeIt from "typeit-react";
import {useInterval} from "../../utils/useInterval";
import {ScrollToTop} from "../../utils/scrollRestoration";
import {chatHistoryAtom} from "../../store/chat_atom";

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
  const [chatHistory, setChatHistory] = useRecoilState(chatHistoryAtom);
  const [isTyping, setIsTyping] = useState(null);
  const [intervieweeAnswer, setIntervieweeAnswer] = useState("");
  const [interviewTurn, setInterviewTurn] = useState(false);
  const [interviewFlag, setInterviewFlag] = useState(false);

  const canNotPlayerTalking = () => {
    if(intervieweeAnswer === "" || interviewTurn === false || isTyping !== null) return true;
    return false;
  }

  const isInterviewEnd = () => {
    const talkLength = chatHistory.length;
    return talkLength >= 10 && chatHistory[talkLength - 1].type === "AI";
  }

  const handleIntervieweeAnswerButton = (e, answerContent) => {
    e.preventDefault();
    if(canNotPlayerTalking()) return;

    const answer = {type:"Human", content: answerContent};
    setChatHistory([...chatHistory, answer]);
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
        handleInterviewerQuestion(null, "아무말 대잔치 하는 중");
      }
      setIsTyping(null);
      return;
    }
  }, 1000, isTyping);

  useEffect(() => {
    // 인터뷰가 끝났을 때, 결과 페이지로 이동합니다.
    // TODO: 종료타이밍을 임의의 기준으로 만듬.
    if(!interviewFlag && isInterviewEnd(chatHistory)){
      setInterviewFlag(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatHistory]);

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
                    setIsTyping({type:item.type, instance:instance});
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
              onClick={(e) => setRoomID("interviewFeedback")}
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