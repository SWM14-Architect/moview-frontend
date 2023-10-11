import React, { useEffect, useState } from "react";
import style from "../../styles/interviewFeedback.module.css";
import { useRecoilState } from "recoil";
import {
  interviewDataAtom,
  interviewResultAtom,
} from "../../store/interviewRoomAtom";
import "chart.js/auto";
import { ScrollToTop } from "../../utils/scrollRestoration";
import {openModalAtom} from "../../store/modalAtom";

function InterviewFeedback() {
  ScrollToTop();
  const [interviewData] = useRecoilState(interviewDataAtom);
  const [interviewResults] = useRecoilState(interviewResultAtom);
  const [interviewRecords, setInterviewRecords] = useState([]);
  const [, setOpenModal] = useRecoilState(openModalAtom);

  function handleEndButtonClick(e) {
    e.preventDefault();
    setOpenModal("feedback");
  }

  useEffect(() => {
    setInterviewRecords(interviewResults.interviewResults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section style={{ backgroundColor: "#f4f7fb", flex: 1 }}>
      <div className={`container`} style={{ flexDirection: "column" }}>
        {/* 타이틀 컴포넌트 */}
        <div className={`fadeInUpEffect`}>
          <div className={`${style.header}`}>
            {interviewData.interviewTargetCompany} 가상면접 결과
          </div>
          <div className={`${style.sub_header}`}>
            {interviewData.interviewTargetPosition}
          </div>
          <FourthStep />
        </div>

        {/* 평가 리스트 */}
        {interviewRecords.map((record, index) => (
            <div
              key={index}
            >
              <div>
                <Accordion index={index} record={record}/>
              </div>
            </div>
          ))}
        {/* 버튼 */}
        <div
          className={`fadeInUpEffect ${style.feedback_end_button}`}
          style={{
            display: "flex",
            justifyContent: "center",
            animationDelay: `0.5s`,
          }}
        >
          <button
            className={`blueButton`}
            style={{ borderRadius: "10px", width: "100%" }}
            onClick={(e) => handleEndButtonClick(e)}
          >
            면접 종료
          </button>
        </div>
      </div>
    </section>
  );
}

function Accordion(props) {
  const [isHidden, setIsHidden] = useState(true);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div
      id="accordion-color"
      data-accordion="collapse"
      data-active-classes="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white"
    >
      <h2 id="accordion-color-heading-1">
        <button
          type="button"
          className="flex items-center justify-between bg-white mt-2 mb-2 w-full p-5 font-medium text-left text-gray-800 border border-b-0 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800"
          data-accordion-target="#accordion-color-body-1"
          aria-expanded="true"
          aria-controls="accordion-color-body-1"
          onClick={toggleHidden}
        >
          <span>{props.index+1} . {props.record.question}</span>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-color-body-1"
        hidden={isHidden}
        className="bg-white mt-2 mb-2"
        aria-labelledby="accordion-color-heading-1"
      >
        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-2 text-gray-800 dark:text-gray-400">
            <div className={style.record_box}>
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white">답변</span>
              <br></br>
              <span>{props.record.answer}</span>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
            <div className={style.record_box}>
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                장점 분석
                </span>
                <br/>

                {props.record.analysis[0]}
                <br />
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                <br />
                <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                단점 분석
                </span>
                <br />
                {props.record.analysis[1]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FourthStep() {
  return (
    <div>
      <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base m-3">
        <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <span className="mr-2">1</span>
            Select <span className="hidden sm:inline-flex sm:ml-2">Mode</span>
          </span>
        </li>

        <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <span className="mr-2">2</span>
            <span className="hidden sm:inline-flex sm:ml-2">Input</span>
          </span>
        </li>

        <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <span className="mr-2">3</span>
            <span className="hidden sm:inline-flex sm:ml-2">Interview</span>
          </span>
        </li>

        <li className="flex items-center text-blue-600">
          <svg
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          Result
        </li>
      </ol>
    </div>
  );
}

export default InterviewFeedback;
