import React, {useCallback, useEffect, useRef, useState} from "react";
import style from "../../styles/interviewInput.module.css";
import { MAXIMUM_COVERLETTER_NUMBER } from "../../constants/interviewInputConst";
import {useRecoilState} from "recoil";
import {roomIdAtom} from "../../store/room_atom";
import {interviewDataAtom} from "../../store/room_atom";
import {ScrollToTop} from "../../utils/scrollRestoration";
import {input} from "../../api/interviewee";


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
          styles={{marginTop:"20px", height:"100px"}}
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
  const [, setRoomID] = useRecoilState(roomIdAtom);
  // 사용자에게서 입력받는 데이터들
  const [intervieweeName, setIntervieweeName] = useState(""); // 지원자 이름
  const [interviewTargetCompany, setInterviewTargetCompany] = useState("");
  const [interviewTargetPosition, setInterviewTargetPosition] = useState("");
  const [interviewRecruitment, setInterviewRecruitment] = useState("");
  const [interviewCoverLetters, setInterviewCoverLetters] = useState([{"id":0, "question":"", "content":""}]);

  // 사용자에게 입력받은 데이터를 전역상태로 저장
  const [, setInterivewData] = useRecoilState(interviewDataAtom);

  function handleIntervieweeNameChange(e) {
    setIntervieweeName(e.target.value);
  }

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
    if(intervieweeName === "") return alert("이름을 입력해주세요.");
    if(interviewTargetCompany === "") return alert("지원하고자 하는 회사를 입력해주세요.");
    if(interviewTargetPosition === "") return alert("지원하고자 하는 직군을 입력해주세요.");
    if(interviewRecruitment === "") return alert("모집공고를 입력해주세요.");
    if(interviewCoverLetters.map((item, index) => item.question === "" || item.content === "").includes(true)) {
      return alert("자소서 항목을 모두 입력해주세요.");
    }
    setRoomID("interviewChat");

    setInterivewData({
      "intervieweeName": intervieweeName,
      "interviewTargetCompany": interviewTargetCompany,
      "interviewTargetPosition": interviewTargetPosition,
      "interviewRecruitment": interviewRecruitment,
      "interviewCoverLetters": interviewCoverLetters
    })
    const coverLettersCopy = interviewCoverLetters.map(({ id, ...item }) => item);
    input({
      jobGroup:interviewTargetPosition,
      recruitmentAnnouncement: interviewRecruitment,
      coverLetterList: coverLettersCopy
    }).then((res) => {
      // TODO: 받아온 데이터를 어떻게 관리할지
      console.log(res);
    }).catch((err) => {
      // TODO: Toast 메시지 띄우기
      console.log(err);
    });
  }

  return (
    <section style={{backgroundColor:"#f4f7fb", flex:1}}>
      <div className={`container`} style={{flexDirection:"column"}}>
        <div className={`${style.header}`}>면접 정보</div>
        <div className={`layout-flex-grid-3 fadeInUpEffect`}>
          <InputComponent
            title={"이름"}
            placeholder={"지원자의 이름을 입력해주세요."}
            item={intervieweeName}
            onChange={handleIntervieweeNameChange}
          />
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