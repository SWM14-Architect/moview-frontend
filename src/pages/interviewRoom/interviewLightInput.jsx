import React, { useCallback, useRef, useState } from "react";
import style from "../../styles/interviewInput.module.css";
import { useRecoilState } from "recoil";
import { CHAT_HISTORY_DEFAULT_VALUE } from "../../constants/interviewChatConst";
import { INTERVIEW_STATE_DEFAULT_VALUE } from "../../constants/interviewRoomConst";
import { ScrollToTop } from "../../utils/scrollRestoration";
import { toast } from "react-toastify";
import { userNicknameAtom } from "../../store/userAtom";
import { chatHistoryAtom } from "../../store/interviewChatAtom";
import { loadingAtom, loadingMessageAtom } from "../../store/loadingAtom";
import {
  interviewDataAtom,
  interviewIdAtom,
  interviewStateAtom,
  roomIdAtom,
} from "../../store/interviewRoomAtom";
import { light_api } from "../../api/interview";

function InterviewLightInput() {
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
  const [userNickname] = useRecoilState(userNicknameAtom);

  // 사용자에게서 입력받는 데이터들
  const [interviewTargetCompany, setInterviewTargetCompany] = useState("");
  const [interviewTargetPosition, setInterviewTargetPosition] = useState("");
  const [interviewTargetKeyword, setInterviewKeyword] = useState("");

  function handleInterviewCompanyChange(e) {
    setInterviewTargetCompany(e.target.value);
  }

  function handleInterviewPositionChange(e) {
    setInterviewTargetPosition(e.target.value);
  }

  function handleInterviewKeyword(e) {
    setInterviewKeyword(e.target.value);
  }

  function handleNextButtonClick(e) {
    e.preventDefault();

    const toastWarning = (text) => {
      // toast에 공통 옵션을 줄 수도 있어서 함수화했습니다.
      toast.warn(text, {});
    };

    // 입력 정보 필터
    if (interviewTargetCompany === "")
      return toastWarning("지원하고자 하는 회사를 입력해주세요.");
    if (interviewTargetPosition === "")
      return toastWarning("지원하고자 하는 직군을 입력해주세요.");

    if (interviewTargetKeyword === "")
      return toastWarning("연습하고 싶은 질문 키워드를 입력해주세요.");

    setInterivewData({
      intervieweeName: userNickname,
      interviewTargetCompany: interviewTargetCompany,
      interviewTargetPosition: interviewTargetPosition,
      interviewTargetKeyword: interviewTargetKeyword,
    });

    // 로딩 렌더링
    setIsLoading(true);
    setLoadingMessage(
      "잠시후 면접이 시작됩니다. 대기 시간은 약 3~6초 정도입니다!"
    );

    //api call
    light_api({
        intervieweeName: userNickname,
        companyName: interviewTargetCompany,
        jobGroup: interviewTargetPosition,
        keyword: interviewTargetKeyword,
    })
    .then((res) => {
        setIsLoading(false);
        setRoomID("interviewChat");
        const interviewStateCopy = JSON.parse(
          JSON.stringify(INTERVIEW_STATE_DEFAULT_VALUE)
        );
        interviewStateCopy.askedQuestions = [];
        interviewStateCopy.initialQuestions = res.message.light_questions.map(
          ({ content, question_id }) => ({
            _id: question_id,
            content: content,
            feedback: 0,
            is_initial: true,
            is_done: false,
          })
        );
        const firstQuestion = interviewStateCopy.initialQuestions[0];
        interviewStateCopy.askedQuestions.push({
          _id: firstQuestion._id,
          content: firstQuestion.content,
        });
        setInterviewState(interviewStateCopy);
        setInterviewId(res.message.interview_id);
        setChatHistory([
          ...CHAT_HISTORY_DEFAULT_VALUE,
          { type: "AI", content: firstQuestion.content },
        ]);
      })
    .catch((err) => {
    setIsLoading(false);
    if (err.response.status === 401) {
        toast.info("다시 로그인을 해주세요.");
    } else {
        toast.error(`오류가 발생했습니다!\n${err.message}`, {});
    }
    });
  }

  return (
    <section style={{ backgroundColor: "#f4f7fb", flex: 1 }}>
      <div className={`container`} style={{ flexDirection: "column" }}>
        <div className={`${style.header}`}>면접 정보 입력 (연습 모드)</div>
        <div className={`layout-flex-grid-2 fadeInUpEffect`}>
          <InputComponent
            title={"회사"}
            placeholder={"지원하고자 하는 회사를 입력하세요."}
            item={interviewTargetCompany}
            onChange={handleInterviewCompanyChange}
          />
          <InputComponent
            title={"직군"}
            placeholder={"지원하고자 하는 직군을 입력하세요. (입력 예시) 웹 개발자"}
            item={interviewTargetPosition}
            onChange={handleInterviewPositionChange}
          />
        </div>
        <div className={`fadeInUpEffect animation-delay-1`}>
          <TextareaComponent
            title={"면접 질문 키워드"}
            placeholder={
              "연습하고 싶은 면접 질문 키워드를 입력하세요. 여러 개 입력 가능합니다. 권장은 2~3개입니다. (입력 예시) DB, 네트워크"
            }
            item={interviewTargetKeyword}
            onChange={handleInterviewKeyword}
          />
        </div>
        <div
          className={`fadeInUpEffect animation-delay-2`}
          style={{ margin: "10px" }}
        ></div>
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