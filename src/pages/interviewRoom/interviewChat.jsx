import React, {useCallback, useEffect, useRef, useState} from "react";
import TypeIt from "typeit-react";
import { useRecoilState } from "recoil";
import {
  interviewDataAtom,
  interviewIdAtom,
  interviewResultAtom,
  interviewStateAtom,
  roomIdAtom
} from "../../store/interviewRoomAtom";
import { chatHistoryAtom } from "../../store/interviewChatAtom";
import { loadingAtom, loadingMessageAtom } from "../../store/loadingAtom";
import { answer_api, evaluation_api } from "../../api/interview";
import { useInterval } from "../../utils/useInterval";
import { ScrollToTop } from "../../utils/scrollRestoration";
import interviewSummaryGenerator from "../../utils/interviewSummaryGenerator";
import { useTTSPlayer } from "../../utils/useTTSPlayer";
import AudioRecorder from "../../utils/audioRecorder";
import AIProfileImage from "../../assets/free-icon-man-4086624-p-500.png";
import HumanProfileImage from "../../assets/free-icon-man-3884851-p-500.png";
import style from "../../styles/interviewChat.module.css";

function TextareaForm({placeholder, item, onChange}){
  const textRef = useRef(null);

  // Textarea height auto resize
  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = "auto";
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
  const [, setIsLoading] = useRecoilState(loadingAtom);
  const [, setLoadingMessage] = useRecoilState(loadingMessageAtom);
  const [, setRoomID] = useRecoilState(roomIdAtom);
  const [interviewData, ] = useRecoilState(interviewDataAtom);
  const [chatHistory, setChatHistory] = useRecoilState(chatHistoryAtom); // 채팅내역
  const [, setInterviewResult] = useRecoilState(interviewResultAtom); // 인터뷰 결과
  const [interviewId, ] = useRecoilState(interviewIdAtom);
  const [interviewState, setInterviewState] = useRecoilState(interviewStateAtom);

  const [isTyping, setIsTyping] = useState(null); // isTyping: Optional[{index: index, type:item.type(AI or Human), instance:TypeIt instance}]
  const [intervieweeAnswerFormText, setIntervieweeAnswerFormText] = useState(""); // Form Value
  const [intervieweeAnswer, setIntervieweeAnswer] = useState(""); // 사용자의 현재 질문에 대한 답변 내용
  const [interviewTurn, setInterviewTurn] = useState(false); // [false: AI 질문 중 true: Interviewee 답변 가능]
  const [interviewFlag, setInterviewFlag] = useState(false); // [false: 인터뷰 진행 중 true: 인터뷰 종료]

  const [currentQuestionContent, setCurrentQuestionContent] = useState(null); // TTS를 실행할 질문 내용
  const [ttsCompleted, setTTSCompleted] = useState(false); // TTS가 완료되었는지 확인하는 상태

  // TTS가 완료되면 호출되는 콜백 함수
  const onTTSComplete = () => {
    setTTSCompleted(true);
  };

  useTTSPlayer(currentQuestionContent, onTTSComplete);

  useEffect(() => {
    // 첫 번째 면접 질문에 대한 TTS 실행
    const interviewStateCopy = JSON.parse(JSON.stringify(interviewState));
    const firstQuestion = interviewStateCopy.askedQuestions[0]?.content;
    if (firstQuestion) {
      setCurrentQuestionContent(firstQuestion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canNotPlayerTalking = () => {
    if (intervieweeAnswerFormText === "" || interviewTurn === false || isTyping !== null || !ttsCompleted) return true;
    return false;
  }

  const canNotPlayerSpeaking = () => {
    if (interviewTurn === false || isTyping !== null || !ttsCompleted) return true;
    return false;
  }

  const handleIntervieweeAnswerButton = (e, answerContent) => {
    e.preventDefault();
    if(canNotPlayerTalking()) return;
    setChatHistory([...chatHistory, {type:"Human", content: answerContent}]);
    setIntervieweeAnswer(answerContent);
    setIntervieweeAnswerFormText("");
    setTTSCompleted(false); // 답변이 완료되면 TTS 재생 상태를 초기화
    intervieweeAnswerRef.current.scrollIntoView({behavior: "smooth"});
  }

  const handleInterviewerQuestion = (e, questionContent) => {
    const question = {type:"AI", content: questionContent};
    setChatHistory([...chatHistory, question]);
  }

  const isInterviewEnded = (followupQuestion) => {
    if(interviewState.initialQuestionIndex >= interviewState.initialQuestions.length-1){
      if(followupQuestion.question_id === null || interviewState.askedQuestions.length >= 15){
        return true;
      }
    }
    return false;
  }

  const setQuestionAsDone = (ask_idx) => {
    const interviewStateCopy = JSON.parse(JSON.stringify(interviewState));
    const question = interviewStateCopy.askedQuestions[ask_idx];
    if(question.is_initial){
      // 초기질문 리스트에서 해당하는 질문을 is_done으로 변경합니다.
      const initialQuestionIndex = interviewStateCopy.initialQuestions.findIndex((item) => item._id === question._id);
      interviewStateCopy.initialQuestions[initialQuestionIndex].is_done = true;
    }
    interviewStateCopy.askedQuestions[ask_idx].is_done = true;
    interviewStateCopy.lastId = question._id;
    interviewStateCopy.lastContent = question.content;
    setInterviewState(interviewStateCopy);
  }

  const getNextQuestion = (followupQuestion) => {
    const interviewStateCopy = JSON.parse(JSON.stringify(interviewState));
    if(followupQuestion.question_id === null || interviewState.followupQuestionCount >= 3){
      console.log("Next Initial Question");
      // 다음 초기질문을 가져옵니다.
      interviewStateCopy.initialQuestionIndex += 1;
      interviewStateCopy.followupQuestionCount = 0;
      const nextQuestion = interviewState.initialQuestions[interviewStateCopy.initialQuestionIndex];
      interviewStateCopy.askedQuestions.push(nextQuestion);
      setInterviewState(interviewStateCopy);
      return nextQuestion;
    }
    else{
      console.log("Next Followup Question");
      // 생성된 꼬리질문을 가져옵니다.
      interviewStateCopy.followupQuestionCount += 1;
      const nextQuestion = {
        _id: followupQuestion.question_id,
        content: followupQuestion.question_content,
        feedback: 0,
        is_initial: false,
        is_done: false
      }
      interviewStateCopy.askedQuestions.push(nextQuestion);
      setInterviewState(interviewStateCopy);
      return nextQuestion;
    }
  }

  const handleInterviewEnd = () => {
    setIsLoading(true);
    setLoadingMessage("면접 결과를 분석하고 있습니다");
    evaluation_api({interview_id: interviewId}).then((res) => {
      console.log(res.message.evaluations);

      setIsLoading(false);
      setInterviewResult(interviewSummaryGenerator(res.message.evaluations)); // 결과내용을 interviewResultAtom에 저장합니다.
      setRoomID("interviewFeedback");
    }).catch((err) => {
      setIsLoading(false);
      console.log(err);
    });
  }

  // 1초마다 입력이 완료되었는지 체크합니다.
  useInterval(() => {
    if(isTyping !== null && isTyping.instance.is("completed")){
      if(isTyping.type === "AI"){
        // AI의 질문이 완료되었을 때, 인터뷰어가 답변을 입력할 수 있도록 합니다.
        setInterviewTurn(true);
      }
      else{
        const currentIndex = interviewState.askedQuestions.length-1;
        const currentQuestion = interviewState.askedQuestions[currentIndex];
        // 유저의 답변이 완료되었을 때,
        answer_api({
          interview_id: interviewId,
          question_id: currentQuestion._id,
          question_content: currentQuestion.content,
          answer_content: intervieweeAnswer
        }).then((res) => {
          console.log("answer Api Success");
          // 질문에 대한 답변을 성공적으로 보냈기 때문에 질문 상태를 갱신합니다.
          setQuestionAsDone(currentIndex);

          if(isInterviewEnded(res.message)){
            // INTERVIEW_END, 결과 페이지로 이동할 수 있는 버튼이 활성화합니다.
            setInterviewFlag(true);
            handleInterviewerQuestion(null, "수고하셨습니다!");
          }
          else{
            // NEXT_QUESTION, 다음 질문을 출력합니다.
            const nextQuestion = getNextQuestion(res.message);

            // 다음 질문에 대한 TTS를 실행합니다.
            setCurrentQuestionContent(nextQuestion.content);

            handleInterviewerQuestion(null, nextQuestion.content);
          }
        })
        .catch((err) => {
          handleInterviewerQuestion(null, "다시 한번 더 말씀해주실 수 있나요?");
          setIntervieweeAnswerFormText(intervieweeAnswer);
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
            <div className={style.input_form_wrapper}>
              <AudioRecorder
                  className={style.audio_recorder}
                  canNotPlayerSpeaking={canNotPlayerSpeaking()}
                  onSTTResult={(result) => setIntervieweeAnswerFormText(result)}
              />
              <TextareaForm
                  placeholder={"질문에 대한 답변을 직접 타이핑하거나, 음성 녹음(Beta)를 이용하여 작성하세요."}
                  item={intervieweeAnswerFormText}
                  onChange={(e) => {setIntervieweeAnswerFormText(e.target.value)}}
              />
            </div>
            <button
              className={`${style.input_form_button} ${canNotPlayerTalking() ? style.input_form_disabled : null}`}
              onClick={(e) => handleIntervieweeAnswerButton(e, intervieweeAnswerFormText)}
            >
              답변 제출하기
            </button>
          </div> :
          <div className={`${style.input_form}`}>
            <button
              className={`${style.input_form_button} ${style.result_form_button}`}
              onClick={() => handleInterviewEnd()}
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