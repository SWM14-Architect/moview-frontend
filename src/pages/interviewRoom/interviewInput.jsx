import React, {useCallback, useEffect, useRef, useState} from "react";
import style from "../../styles/interviewInput.module.css";
import {MAXIMUM_COVERLETTER_NUMBER} from "../../constants/interviewInputConst";
import {useRecoilState} from "recoil";
import {interviewDataAtom, interviewIdAtom, interviewStateAtom, roomIdAtom} from "../../store/interviewRoomAtom";
import {ScrollToTop} from "../../utils/scrollRestoration";
import {input_api} from "../../api/interview";
import {toast} from "react-toastify";
import {chatHistoryAtom} from "../../store/interviewChatAtom";
import {CHAT_HISTORY_DEFAULT_VALUE} from "../../constants/interviewChatConst";
import {INTERVIEW_STATE_DEFAULT_VALUE} from "../../constants/interviewRoomConst";
import {loadingAtom, loadingMessageAtom} from "../../store/loadingAtom";
import {userNicknameAtom} from "../../store/userAtom";


function InputForm({placeholder, item, index, onChange}){
  return (
    <input
      className={`${style.input_form_textbox}`}
      type="text"
      placeholder={placeholder}
      onChange={e => index !== null ? onChange(e, index) : onChange(e)}
      value={item}
    />
  );
}

function InputComponent({title, placeholder, item, onChange}){
  return (
   <div className={`${style.input_form_box}`}>
    <div className={`${style.input_title}`}>{title}</div>
     <InputForm placeholder={placeholder} item={item} index={null} onChange={onChange} />
   </div>
  )
}

function TextareaForm({placeholder, item, index, onChange, styles={}}){
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
      onChange={e => index !== null ? onChange(e, index) : onChange(e)}
      style={styles}
      value={item}
    />
  );
}

function TextareaComponent({title, placeholder, item, onChange}){
  return (
    <div className={`${style.input_form_box}`}>
      <div className={`${style.input_title}`}>{title}</div>
      <TextareaForm placeholder={placeholder} item={item} index={null} onChange={onChange}/>
    </div>
  );
}

function CoverLetterForm({refs, index, length, item, onQuestionChange, onContentChange, addCoverletter, deleteCoverletter}){
  return (
    <div ref={refs} className={`${style.input_coverletter_box}`}>
      {
        length-1 === index && MAXIMUM_COVERLETTER_NUMBER > length ?
        <button
          className={`${style.input_coverletter_button} ${style.coverletter_plus_button} ${length === 1 ? style.coverletter_plus_button_first : null}`}
          onClick={() => addCoverletter()}
        >+</button>:null
      }
      {length > 1 ?
        <button
          className={`${style.input_coverletter_button} ${style.coverletter_minus_button}`}
          onClick={() => deleteCoverletter(item.id)}
        >-</button>:null
      }
      <div className={`${style.input_form_box}`}>
        <InputForm
          placeholder={"자소서 문항을 입력하세요. (ex. 회사에 지원하게 된 계기는?)"}
          item={item.question}
          index={index}
          onChange={onQuestionChange}
        />
        <TextareaForm
          placeholder={"자소서 문항에 대한 답변을 작성하세요."}
          item={item.content}
          index={index}
          onChange={onContentChange}
          styles={{marginTop:"20px", minHeight:"100px"}}
        />
      </div>
    </div>
  );
}

function CoverLetterComponent({coverLetters, setCoverLetters}){
  const lastCoverletterRef = useRef(null);
  const nextID = useRef(1);

  useEffect(() => {
    if(lastCoverletterRef.current !== null) {
      lastCoverletterRef.current.scrollIntoView({behavior: "smooth"});
    }
  }, [coverLetters]);

  function addCoverletter() {
    if(coverLetters.length >= MAXIMUM_COVERLETTER_NUMBER) return;

    const input = {
      id: nextID.current,
      question: '',
      content: ''
    };
    setCoverLetters([...coverLetters, input]);
    nextID.current += 1;
  }

  function deleteCoverletter(index) {
    setCoverLetters(coverLetters.filter(item => item.id !== index));
  }

  function handleQuestionChange(e, index) {
    if (index > coverLetters.length) return;

    const coverLettersCopy = JSON.parse(JSON.stringify(coverLetters));
    coverLettersCopy[index].question = e.target.value;
    setCoverLetters(coverLettersCopy);
  }

  function handleContentChange(e, index) {
    if (index > coverLetters.length) return;

    const coverLettersCopy = JSON.parse(JSON.stringify(coverLetters));
    coverLettersCopy[index].content = e.target.value;
    setCoverLetters(coverLettersCopy);
  }

  return (
    <div>
      {coverLetters.map((item, index) => (
        <CoverLetterForm
          refs={lastCoverletterRef}
          key={index}
          length={coverLetters.length}
          index={index}
          item={item}
          onQuestionChange={handleQuestionChange}
          onContentChange={handleContentChange}
          addCoverletter={addCoverletter}
          deleteCoverletter={deleteCoverletter}
        />
      ))}
      </div>
  );
}

function InterviewInput(){
  ScrollToTop();
  const [, setIsLoading] = useRecoilState(loadingAtom);
  const [, setLoadingMessage] = useRecoilState(loadingMessageAtom);
  // 사용자의 화면을 변경하기 위한 RoomID
  const [, setRoomID] = useRecoilState(roomIdAtom);
  // 사용자에게 입력받은 데이터를 전역상태로 저장
  const [, setInterivewData] = useRecoilState(interviewDataAtom);
  // 채팅방 대화 기록 (이전에 저장된 대화를 삭제하기 위해서 setter만 불러옴)
  const [, setChatHistory] = useRecoilState(chatHistoryAtom);
  // Interview ID
  const [, setInterviewId] = useRecoilState(interviewIdAtom);
  // 클라이언트 상태 관리
  const [, setInterviewState] = useRecoilState(interviewStateAtom);
  // 사용자 닉네임
  const [userNickname, ] = useRecoilState(userNicknameAtom);

  // 사용자에게서 입력받는 데이터들
  const [interviewTargetCompany, setInterviewTargetCompany] = useState("");
  const [interviewTargetPosition, setInterviewTargetPosition] = useState("");
  const [interviewRecruitment, setInterviewRecruitment] = useState("");
  const [interviewCoverLetters, setInterviewCoverLetters] = useState([{"id":0, "question":"", "content":""}]);


  function handleInterviewCompanyChange(e) {
    setInterviewTargetCompany(e.target.value);
  }

  function handleInterviewPositionChange(e) {
    setInterviewTargetPosition(e.target.value);
  }

  function handleInterviewRecruitmentChange(e) {
    setInterviewRecruitment(e.target.value);
  }

  function handleNextButtonClick(e) {
    e.preventDefault();

    const toastWarning = (text) => {
      // toast에 공통 옵션을 줄 수도 있어서 함수화했습니다.
      toast.warn(text, {});
    }

    if(interviewTargetCompany === "") return toastWarning("지원하고자 하는 회사를 입력해주세요.");
    if(interviewTargetPosition === "") return toastWarning("지원하고자 하는 직군을 입력해주세요.");
    if(interviewRecruitment === "") return toastWarning("모집공고를 입력해주세요.");
    if(interviewCoverLetters.map((item, index) => item.question === "" || item.content === "").includes(true)) {
      return toastWarning("자소서 항목을 모두 입력해주세요.");
    }

    setInterivewData({
      "intervieweeName": userNickname,
      "interviewTargetCompany": interviewTargetCompany,
      "interviewTargetPosition": interviewTargetPosition,
      "interviewRecruitment": interviewRecruitment,
      "interviewCoverLetters": interviewCoverLetters
    })
    const coverLettersCopy = interviewCoverLetters.map(({ id, ...item }) => item);

    setIsLoading(true);
    setLoadingMessage("잠시후 면접이 시작됩니다");
    input_api({
      intervieweeName: userNickname,
      companyName: interviewTargetCompany,
      jobGroup: interviewTargetPosition,
      recruitAnnouncement: interviewRecruitment,
      coverLetterQuestions: coverLettersCopy.map(({question, content}) => question),
      coverLetterAnswers: coverLettersCopy.map(({question, content}) => content)
    })
    .then((res) => {
      setIsLoading(false);
      setRoomID("interviewChat");
      const interviewStateCopy = JSON.parse(JSON.stringify(INTERVIEW_STATE_DEFAULT_VALUE));
      interviewStateCopy.askedQuestions = [];
      interviewStateCopy.initialQuestions = res.message.initial_questions.map(({content, question_id}) => ({
        _id: question_id,
        content: content,
        feedback: 0,
        is_initial: true,
        is_done: false,
      }));
      const firstQuestion = interviewStateCopy.initialQuestions[0];
      interviewStateCopy.askedQuestions.push({_id:firstQuestion._id, content:firstQuestion.content});
      setInterviewState(interviewStateCopy);
      setInterviewId(res.message.interview_id);
      setChatHistory([...CHAT_HISTORY_DEFAULT_VALUE, {type:"AI", content:firstQuestion.content}]);
    })
    .catch((err) => {
      setIsLoading(false);
      if(err.response.status === 401){
        toast.info("다시 로그인을 해주세요.");
      }
      else {
        toast.error(`오류가 발생했습니다!\n${err.message}`, {});
      }
    });
  }

  return (
    <section style={{backgroundColor:"#f4f7fb", flex:1}}>
      <div className={`container`} style={{flexDirection:"column"}}>
        <div className={`${style.header}`}>면접 정보</div>
        <div className={`layout-flex-grid-2 fadeInUpEffect`}>
          <InputComponent
            title={"회사"}
            placeholder={"지원하고자 하는 회사를 입력하세요."}
            item={interviewTargetCompany}
            onChange={handleInterviewCompanyChange}
          />
          <InputComponent
            title={"직군"}
            placeholder={"지원하고자 하는 직군을 입력하세요."}
            item={interviewTargetPosition}
            onChange={handleInterviewPositionChange}
          />
        </div>
        <div className={`fadeInUpEffect animation-delay-1`}>
          <TextareaComponent
            title={"모집공고"}
            placeholder={"회사의 모집공고를 작성하세요."}
            item={interviewRecruitment}
            onChange={handleInterviewRecruitmentChange}
          />
        </div>
        <div className={`fadeInUpEffect animation-delay-2`} style={{margin:"10px"}}>
          <div className={`${style.input_title}`}>자소서 입력</div>
          <CoverLetterComponent coverLetters={interviewCoverLetters} setCoverLetters={setInterviewCoverLetters}/>
        </div>
        <div className={`fadeInUpEffect animation-delay-2`} style={{display:"flex", justifyContent:"center"}}>
          <button className={`blueButton`} style={{borderRadius:"10px", width:"100px"}} onClick={(e) => handleNextButtonClick(e)}>면접시작</button>
        </div>
      </div>
    </section>
  );
}

export default InterviewInput;