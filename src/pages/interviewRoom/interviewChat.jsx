import React, {useCallback, useRef, useState} from "react";
import style from "../../styles/interviewChat.module.css";
import {useRecoilState} from "recoil";
import {interviewDataAtom} from "../../store/room_atom";
import AIProfileImage from "../../assets/free-icon-man-4086624-p-500.png";
import HumanProfileImage from "../../assets/free-icon-man-3884851-p-500.png";
import TypeIt from "typeit-react";
import {useInterval} from "../../utils/useInterval";

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
  const intervieweeAnswerRef = useRef(null);
  const [interviewData, ] = useRecoilState(interviewDataAtom);
  const [interviewTalks, setInterviewTalks] = useState([
    {type:"AI", content: "안녕하세요. 저는 인공지능 면접관입니다. 제가 질문을 하면 답변을 작성하여 제출해주시면 됩니다."}
  ]);
  const [isTyping, setIsTyping] = useState(null);
  const [intervieweeAnswer, setIntervieweeAnswer] = useState("");
  const [interviewTurn, setInterviewTurn] = useState(false);

  const canNotPlayerTalking = () => {
    if(intervieweeAnswer === "" || interviewTurn === false || isTyping !== null) return true;
    return false;
  }

  const handleIntervieweeAnswerButton = (e, answerContent) => {
    e.preventDefault();
    if(canNotPlayerTalking()) return;
    const answer = {type:"human", content: answerContent};
    setInterviewTalks([...interviewTalks, answer]);
    setIntervieweeAnswer("");
    intervieweeAnswerRef.current.scrollIntoView({behavior: "smooth"});
  }

  const handleInterviewerQuestion = (e, questionContent) => {
    // e.preventDefault();
    const question = {type:"AI", content: questionContent};
    setInterviewTalks([...interviewTalks, question]);
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
  }, 1000, [isTyping]);

  return (
    <section style={{backgroundColor:"#f4f7fb", flex:1}}>
      <div className={`container`} style={{flexDirection:"column"}}>
        {/* 타이틀 컴포넌트 */}
        <div className={`fadeInUpEffect`}>
          <div className={`${style.header}`}>{interviewData.interviewTargetCompany} 가상면접</div>
          <div className={`${style.sub_header}`}>{interviewData.interviewTargetPosition}</div>
        </div>
        {/* 인터뷰 채팅 히스토리 컴포넌트 */}
        {interviewTalks.map((item, index) => (
          <div key={index} className={`${style.chat_box} fadeInUpEffect`}>
            <div className={`${style.profile_box} ${item.type === "AI" ? null : style.profile_back}`}>
              <img src={item.type === "AI" ? AIProfileImage : HumanProfileImage} className={`${style.profile_image}`}/>
              <span>{item.type === "AI" ? "AI면접관" : "나"}</span>
            </div>
            <TypeIt
              className={`${style.chat_message}`}
              options={{cursor: false, speed: 40}}
              getBeforeInit={(instance) => {
                // 마지막 대화에 대해서만 typing을 체크합니다.
                if(index === interviewTalks.length-1) {
                  setIsTyping({type:item.type, instance:instance});
                }
                setInterviewTurn(false);
                return instance;
              }}
            >
              {item.content}
            </TypeIt>
          </div>
        ))}
        {/* 답변 작성 컴포넌트 */}
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
        </div>
      </div>
    </section>
  );
}

export default InterviewChat;