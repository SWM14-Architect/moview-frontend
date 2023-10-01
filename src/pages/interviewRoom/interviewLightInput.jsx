import React, { useCallback, useEffect, useRef, useState } from "react";
import style from "../../styles/interviewInput.module.css";
import { useRecoilState } from "recoil";
import {
  interviewDataAtom,
  interviewIdAtom,
  interviewStateAtom,
  roomIdAtom,
} from "../../store/interviewRoomAtom";
import { ScrollToTop } from "../../utils/scrollRestoration";
import { toast } from "react-toastify";

function InterviewLightInput() {
  ScrollToTop();

  // 사용자에게서 입력받는 데이터들
  const [interviewTargetCompany, setInterviewTargetCompany] = useState("");
  const [interviewTargetPosition, setInterviewTargetPosition] = useState("");
  const [interviewRecruitment, setInterviewRecruitment] = useState("");

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
  }

  return (
    <section style={{ backgroundColor: "#f4f7fb", flex: 1 }}>
      <div className={`container`} style={{ flexDirection: "column" }}>
        <div className={`${style.header}`}>면접 정보 입력 (연습 모드)</div>
        <div className={`layout-flex-grid-2 fadeInUpEffect`}>
          <InputComponent
            title={"회사"}
            placeholder={"지원하고자 하는 회사를 입력하세요."}
            item={"hi"}
            onChange={handleInterviewCompanyChange}
          />
          <InputComponent
            title={"직군"}
            placeholder={"지원하고자 하는 직군을 입력하세요."}
            item={"hi"}
            onChange={handleInterviewPositionChange}
          />
        </div>
        <div className={`fadeInUpEffect animation-delay-1`}>
          <TextareaComponent
            title={"면접 질문 키워드"}
            placeholder={"연습하고 싶은 면접 질문 키워드를 입력하세요. (여러 개 가능)"}
            item={"hi"}
            onChange={handleInterviewRecruitmentChange}
          />
        </div>
        <div
          className={`fadeInUpEffect animation-delay-2`}
          style={{ margin: "10px" }}
        >
        </div>
        <div
          className={`fadeInUpEffect animation-delay-2`}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button
            className={`blueButton`}
            style={{ borderRadius: "10px", width: "100px" }}
            onClick={(e) => handleNextButtonClick(e)}
          >
            면접시작
          </button>
        </div>
      </div>
    </section>
  );
}
function InputComponent({ title, placeholder, item, onChange }) {
  return (
    <div className={`${style.input_form_box}`}>
      <div className={`${style.input_title}`}>{title}</div>
      <InputForm
        placeholder={placeholder}
        item={item}
        index={null}
        onChange={onChange}
      />
    </div>
  );
}

function InputForm({ placeholder, item, index, onChange }) {
  return (
    <input
      className={`${style.input_form_textbox}`}
      type="text"
      placeholder={placeholder}
      onChange={(e) => (index !== null ? onChange(e, index) : onChange(e))}
      value={item}
    />
  );
}

function TextareaForm({ placeholder, item, index, onChange, styles = {} }) {
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
      onChange={(e) => (index !== null ? onChange(e, index) : onChange(e))}
      style={styles}
      value={item}
    />
  );
}

function TextareaComponent({ title, placeholder, item, onChange }) {
  return (
    <div className={`${style.input_form_box}`}>
      <div className={`${style.input_title}`}>{title}</div>
      <TextareaForm
        placeholder={placeholder}
        item={item}
        index={null}
        onChange={onChange}
      />
    </div>
  );
}

export default InterviewLightInput;
