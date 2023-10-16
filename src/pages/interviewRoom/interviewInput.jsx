import React, { useEffect, useRef, useState } from "react";
import style from "../../styles/interviewInput.module.css";
import {
  MAXIMUM_COVERLETTER_NUMBER,
  MAX_COMPANY_NAME_LENGTH,
  MAX_POSITION_NAME_LENGTH,
  MAX_RECRUITMENT_LENGTH,
  MAX_COVERLETTER_QUESTION_LENGTH,
  MAX_COVERLETTER_ANSWER_LENGTH,
} from "../../constants/interviewInputConst";
import { useRecoilState } from "recoil";
import {
  interviewDataAtom,
  interviewIdAtom,
  interviewStateAtom,
  roomIdAtom,
} from "../../store/interviewRoomAtom";
import { ScrollToTop } from "../../utils/scrollRestoration";
import { input_api } from "../../api/interview";
import { toast } from "react-toastify";
import { chatHistoryAtom } from "../../store/interviewChatAtom";
import { CHAT_HISTORY_DEFAULT_VALUE } from "../../constants/interviewChatConst";
import { INTERVIEW_STATE_DEFAULT_VALUE } from "../../constants/interviewRoomConst";
import { loadingAtom, loadingMessageAtom } from "../../store/loadingAtom";
import { userNicknameAtom } from "../../store/userAtom";

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

function TextareaComponent({ title, placeholder, item, onChange, charCount }) {
  return (
    <div className={`${style.input_form_box}`}>
      <div className={`${style.input_title}`}>{title}</div>
      <TextareaForm
        placeholder={placeholder}
        item={item}
        index={null}
        onChange={onChange}
      />
      <div className={style.char_count}>{`${charCount} / ${MAX_RECRUITMENT_LENGTH}자`}</div>
    </div>
  );
}

function CoverLetterForm({
  refs,
  index,
  length,
  item,
  charCount,
  onQuestionChange,
  onContentChange,
  addCoverletter,
  deleteCoverletter,
}) {
  return (
    <div ref={refs} className={`${style.input_coverletter_box}`}>
      {length - 1 === index && MAXIMUM_COVERLETTER_NUMBER > length ? (
        <button
          className={`${style.input_coverletter_button} ${
            style.coverletter_plus_button
          } ${length === 1 ? style.coverletter_plus_button_first : null}`}
          onClick={() => addCoverletter()}
        >
          +
        </button>
      ) : null}
      {length > 1 ? (
        <button
          className={`${style.input_coverletter_button} ${style.coverletter_minus_button}`}
          onClick={() => deleteCoverletter(item.id)}
        >
          -
        </button>
      ) : null}
      <div className={`${style.input_form_box}`}>
        <InputForm
          placeholder={`자소서 항목을 입력하세요. (최대 ${MAX_COVERLETTER_QUESTION_LENGTH}자)`}
          item={item.question}
          index={index}
          onChange={onQuestionChange}
        />
        <div>
          <TextareaForm
              placeholder={"자소서 항목에 대한 내용을 작성하세요."}
              item={item.content}
              index={index}
              onChange={(e) => onContentChange(e, index)}
              styles={{ marginTop: "20px", paddingBottom: "20px", minHeight: "100px" }}
          />
          <div className={style.char_count}>{`${charCount} / ${MAX_COVERLETTER_ANSWER_LENGTH}자`}</div>
        </div>
      </div>
    </div>
  );
}

function CoverLetterComponent({ coverLetters, setCoverLetters }) {
  const [coverLetterContentCharCounts, setCoverLetterContentCharCounts] = useState([]);  // 글자수를 저장할 상태
  const lastCoverletterRef = useRef(null);
  const nextID = useRef(1);

  useEffect(() => {
    if (lastCoverletterRef.current !== null) {
      lastCoverletterRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [coverLetters]);

  function addCoverletter() {
    if (coverLetters.length >= MAXIMUM_COVERLETTER_NUMBER) return;

    const input = {
      id: nextID.current,
      question: "",
      content: "",
    };
    setCoverLetters([...coverLetters, input]);
    nextID.current += 1;
  }

  function deleteCoverletter(index) {
    setCoverLetters(coverLetters.filter((item) => item.id !== index));
  }

  function handleQuestionChange(e, index) {
    if (index > coverLetters.length) return;

    const inputValue = e.target.value;
    if (inputValue.length > MAX_COVERLETTER_QUESTION_LENGTH) {
      toast.warn(`자소서 문항은 ${MAX_COVERLETTER_QUESTION_LENGTH}자를 초과할 수 없습니다.`);
      setCoverLetters(prevState => {
        const newState = JSON.parse(JSON.stringify(prevState));
        newState[index].question = inputValue.substring(0, MAX_COVERLETTER_QUESTION_LENGTH);
        return newState;
      });
    } else {
      const coverLettersCopy = JSON.parse(JSON.stringify(coverLetters));
      coverLettersCopy[index].question = inputValue;
      setCoverLetters(coverLettersCopy);
    }
  }

  function handleContentChange(e, index) {
    if (index > coverLetters.length) return;

    const inputValue = e.target.value;
    const newCharCount = inputValue.length;
    if (newCharCount > MAX_COVERLETTER_ANSWER_LENGTH) {
      toast.warn(`자소서 답변은 ${MAX_COVERLETTER_ANSWER_LENGTH}자를 초과할 수 없습니다.`);
      setCoverLetters(prevState => {
        const newState = JSON.parse(JSON.stringify(prevState));
        newState[index].content = inputValue.substring(0, MAX_COVERLETTER_ANSWER_LENGTH);
        return newState;
      });
      setCoverLetterContentCharCounts(prevCounts => {
        const newCounts = [...prevCounts];
        newCounts[index] = MAX_COVERLETTER_ANSWER_LENGTH;
        return newCounts;
      });
    } else {
      const coverLettersCopy = JSON.parse(JSON.stringify(coverLetters));
      coverLettersCopy[index].content = inputValue;
      setCoverLetters(coverLettersCopy);
      setCoverLetterContentCharCounts(prevCounts => {
        const newCounts = [...prevCounts];
        newCounts[index] = newCharCount;
        return newCounts;
      });
    }
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
          charCount={coverLetterContentCharCounts[index] || 0}
          onQuestionChange={handleQuestionChange}
          onContentChange={(e) => handleContentChange(e, index)}
          addCoverletter={addCoverletter}
          deleteCoverletter={deleteCoverletter}
        />
      ))}
    </div>
  );
}

function InterviewInput() {
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
  const [interviewRecruitment, setInterviewRecruitment] = useState("");
  const [interviewCoverLetters, setInterviewCoverLetters] = useState([
    { id: 0, question: "", content: "" },
  ]);
  const [interviewRecruitmentCharCount, setInterviewRecruitmentCharCount] = useState(0);  // 모집 공고 글자수를 저장할 상태

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

  function handleInterviewRecruitmentChange(e) {
    const inputValue = e.target.value;
    const newCharCount = inputValue.length;

    if (newCharCount > MAX_RECRUITMENT_LENGTH) {
      toast.warn(`모집 공고는 ${MAX_RECRUITMENT_LENGTH}자를 초과할 수 없습니다.`);
      setInterviewRecruitment(e.target.value.substring(0, MAX_RECRUITMENT_LENGTH));
      setInterviewRecruitmentCharCount(MAX_RECRUITMENT_LENGTH);
    } else {
      setInterviewRecruitment(inputValue);
      setInterviewRecruitmentCharCount(newCharCount);
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

    if (interviewTargetCompany === "")
      return toastWarning("지원하고자 하는 회사를 입력해주세요.");
    if (interviewTargetPosition === "")
      return toastWarning("지원하고자 하는 직군을 입력해주세요.");
    if (interviewRecruitment === "")
      return toastWarning("모집공고를 입력해주세요.");
    if (
      interviewCoverLetters
        .map((item, index) => item.question === "" || item.content === "")
        .includes(true)
    ) {
      return toastWarning("자소서 항목을 모두 입력해주세요.");
    }

    setInterivewData({
      intervieweeName: userNickname,
      interviewTargetCompany: interviewTargetCompany,
      interviewTargetPosition: interviewTargetPosition,
      interviewRecruitment: interviewRecruitment,
      interviewCoverLetters: interviewCoverLetters,
    });
    const coverLettersCopy = interviewCoverLetters.map(
      ({ id, ...item }) => item
    );

    setIsLoading(true);
    setLoadingMessage("잠시 후 면접이 시작됩니다. 대기 시간은 약 10 ~ 15초 정도입니다!");
    input_api({
      intervieweeName: userNickname,
      companyName: interviewTargetCompany,
      jobGroup: interviewTargetPosition,
      recruitAnnouncement: interviewRecruitment,
      coverLetterQuestions: coverLettersCopy.map(
        ({ question, content }) => question
      ),
      coverLetterAnswers: coverLettersCopy.map(
        ({ question, content }) => content
      ),
    })
      .then((res) => {
        setIsLoading(false);
        setRoomID("interviewChat");
        const interviewStateCopy = JSON.parse(
          JSON.stringify(INTERVIEW_STATE_DEFAULT_VALUE)
        );
        interviewStateCopy.askedQuestions = [];
        interviewStateCopy.initialQuestions = res.message.initial_questions.map(
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
        <div className={`${style.header}`}>면접 정보 입력 (실전 모드)</div>
        <SecondStep/>
        <div className={`layout-flex-grid-2 fadeInUpEffect`}>
          <InputComponent
            title={"회사"}
            placeholder={`지원하고자 하는 회사를 입력하세요. (최대 ${MAX_COMPANY_NAME_LENGTH}자)`}
            item={interviewTargetCompany}
            onChange={handleInterviewCompanyChange}
          />
          <InputComponent
            title={"직군"}
            placeholder={`지원하고자 하는 직군을 입력하세요. (최대 ${MAX_POSITION_NAME_LENGTH}자)`}
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
            charCount={interviewRecruitmentCharCount}
          />
        </div>
        <div
          className={`fadeInUpEffect animation-delay-2`}
          style={{ margin: "10px" }}
        >
          <div className={`${style.input_title}`}>자소서 항목 입력 ( + 버튼을 이용해 자소서 항목을 추가할 수 있어요!)</div>
          <CoverLetterComponent
            coverLetters={interviewCoverLetters}
            setCoverLetters={setInterviewCoverLetters}
          />
        </div>
        <div
          className={`fadeInUpEffect animation-delay-2`}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button
            className={`redButton`}
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

export default InterviewInput;
