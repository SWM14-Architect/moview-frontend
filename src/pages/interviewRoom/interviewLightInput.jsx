import React, {useEffect, useRef, useState} from "react";
import style from "../../styles/interviewInput.module.css";
import { useRecoilState } from "recoil";
import {
  MAX_COMPANY_NAME_LENGTH,
  MAX_POSITION_NAME_LENGTH,
  MAX_KEYWORD_LENGTH,
} from "../../constants/interviewInputConst";
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
    if (e.target.value.length > MAX_COMPANY_NAME_LENGTH) {
      toast.warn(`회사 이름은 ${MAX_COMPANY_NAME_LENGTH}자를 초과할 수 없습니다.`);
      setInterviewTargetCompany(e.target.value.substring(0, MAX_COMPANY_NAME_LENGTH));
    } else {
      setInterviewTargetCompany(e.target.value);
    }
  }

  function handleInterviewPositionChange(e) {
    if (e.target.value.length > MAX_POSITION_NAME_LENGTH) {
      toast.warn(`직군명은 ${MAX_POSITION_NAME_LENGTH}자를 초과할 수 없습니다.`);
      setInterviewTargetPosition(e.target.value.substring(0, MAX_POSITION_NAME_LENGTH));
    } else {
      setInterviewTargetPosition(e.target.value);
    }
  }

  function handleInterviewKeyword(e) {
    if (e.target.value.length > MAX_KEYWORD_LENGTH) {
      toast.warn(`키워드는 ${MAX_KEYWORD_LENGTH}자를 초과할 수 없습니다.`);
      setInterviewKeyword(e.target.value.substring(0, MAX_KEYWORD_LENGTH));
    } else {
      setInterviewKeyword(e.target.value);
    }
  }

  const handleButtonBack = (e) => {
    e.preventDefault();
    setRoomID("modeSelect");
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
      "잠시 후 면접이 시작됩니다. 대기 시간은 약 6 ~ 9초 정도입니다!"
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
        interviewStateCopy.askedQuestions.push(firstQuestion);
        setInterviewState(interviewStateCopy);
        setInterviewId(res.message.interview_id);
        setChatHistory([
          ...CHAT_HISTORY_DEFAULT_VALUE,
          { type: "AI", content: firstQuestion.content },
        ]);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response?.status !== 401) {
          toast.error(`${err.response?.data.message ? err.response.data.message.error : "오류가 발생했습니다!\n" + err.message}`, {});
        }
      });
  }

  return (
    <section style={{ backgroundColor: "#f4f7fb", flex: 1 }}>
      <div className={`container`} style={{ flexDirection: "column" }}>
        <div className={`${style.header}`}>면접 정보 입력 (연습 모드)</div>
        <SecondStep />
        <div className={`layout-flex-grid-2 fadeInUpEffect`}>
          <InputComponent
            title={"회사"}
            placeholder={`지원하고자 하는 회사를 입력하세요. (최대 ${MAX_COMPANY_NAME_LENGTH}자)`}
            item={interviewTargetCompany}
            onChange={handleInterviewCompanyChange}
          />
          <InputComponent
            title={"직군"}
            placeholder={
              `지원하고자 하는 직군을 입력하세요. (최대 ${MAX_POSITION_NAME_LENGTH}자)`
            }
            item={interviewTargetPosition}
            onChange={handleInterviewPositionChange}
          />
        </div>
        <div className={`fadeInUpEffect animation-delay-1`}>
          <TextareaComponent
            title={"면접 질문 키워드"}
            placeholder={
              `연습하고 싶은 면접 질문 키워드를 입력하세요. 여러 개 입력 가능합니다. 권장 키워드 개수는 2~3개입니다. (입력 예시: DB, 네트워크)
(최대 ${MAX_KEYWORD_LENGTH}자)`
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
            style={{ margin: "60px 10px 15px", borderRadius: "10px", width: "100px" }}
            onClick={(e) => handleNextButtonClick(e)}
          >
            면접시작
          </button>
          {/*뒤로가기 버튼*/}
          <button
            className={`grayButton`}
            style={{ margin: "60px 10px 15px", width: "100px", borderRadius: "10px" }}
            onClick={(e) => handleButtonBack(e)}
          >
            뒤로가기
          </button>
        </div>
      </div>
    </section>
  );
}

function SecondStep() {
  return (
    <div>
      <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base m-3">
        <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <span className="mr-2">1</span>
            Select <span className="hidden sm:inline-flex sm:ml-2">Mode</span>
          </span>
        </li>

        <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="hidden sm:inline-flex sm:ml-2">Input</span>
          </span>
        </li>

        <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <span className="mr-2">3</span>
            <span className="hidden sm:inline-flex sm:ml-2">Interview</span>
          </span>
        </li>

        <li className="flex items-center">
          <span className="mr-2">4</span>
          Result
        </li>
      </ol>
    </div>
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
  useEffect(() => {
    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, [item]);

  return (
    <textarea
      ref={textRef}
      className={`${style.input_form_textbox}`}
      placeholder={placeholder}
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
