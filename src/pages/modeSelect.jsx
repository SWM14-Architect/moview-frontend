import React from "react";
import { ScrollToTop } from "../utils/scrollRestoration";
import style from "../styles/modelSelect.module.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {roomIdAtom} from "../store/interviewRoomAtom";

function ModeSelect() {
  ScrollToTop();
  const navigate = useNavigate();
  const [, setRoomID] = useRecoilState(roomIdAtom);

  const handleButtonClick = (e) => {
    e.preventDefault();
    setRoomID("interviewInput");
    navigate("/room");
  };

  const handleButtonClickOfLight = (e) => {
    e.preventDefault();
    setRoomID("interviewLight");
    navigate("/room");
  };

  return (
    <section style={{ backgroundColor: "#f4f7fb", flex: 1 }}>
      <div className={`container`} style={{ flexDirection: "column" }}>
        {/* 타이틀 컴포넌트 */}
        <div className={`fadeInUpEffect`}>
          <div className={`${style.header}`}>모드 선택</div>
        </div>

        {/* stepper */}
        <FirstStep />

        {/*연습 모드 설명 컴포넌트*/}
        <ModeExplanation
          isLight={true}
          item={
            "자소서 없이 직무 질문만 가볍게 연습하고 싶다면, 연습 모드를 선택해주세요! 반복연습해서 당신의 지식으로 만들어 보자구요!"
          }
        />

        {/*실전 모드 설명 컴포넌트*/}
        <ModeExplanation
          isLight={false}
          item={
            "면접이 얼마 안 남았다면, 실전 모드를 선택해서 실제 면접에 나올 수 있는 질문들을 대비하세요! (단, 자소서 입력이 필요합니다.)"
          }
        />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/*연습 모드 버튼*/}
          <button
            className={`blueButton`}
            style={{
              marginTop: "60px",
              marginBottom: "15px",
              marginRight: "20px",
              width: "150px",
              borderRadius: "10px",
            }}
            onClick={(e) => handleButtonClickOfLight(e)}
          >
            연습
          </button>

          {/*실전 모드 버튼*/}
          <button
            className={`redButton`}
            style={{
              marginTop: "60px",
              marginBottom: "15px",
              width: "150px",
              borderRadius: "10px",
            }}
            onClick={(e) => handleButtonClick(e)}
          >
            실전
          </button>
        </div>
      </div>
    </section>
  );
}

function FirstStep() {
  return (
    <div>
      <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base m-3">
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

        <li className="flex items-center">
          <span className="mr-2">4</span>
          Result
        </li>
      </ol>
    </div>
  );
}
function ModeExplanation({isLight}) {
  return (
    <div className={`${style.input_form}`}>
      <div className={`${style.chat_box} fadeInUpEffect`}>
        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{isLight? "연습 모드" : "실전 모드"}</h2>
      <ol className="max-w space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400">
        <li>
          <span className="text-gray-900 dark:text-white">
            {isLight? "모집 공고, 자소서 없이 가볍게 연습할 수 있는 모드 ": "모집 공고, 자소서를 분석해서 개인 맞춤형 질문을 연습할 수 있는 모드"}
          </span>
        </li>
        <li>
          <span className="text-gray-900 dark:text-white">
            {isLight? "면접 키워드 중심으로 연습":"면접 일정이 얼마 안 남았을 때 유용"}
          </span>
        </li>
        <li>
          <span className="text-gray-900 dark:text-white">
            꼬리질문 및 답변 평가 기능 제공
          </span>
        </li>
      </ol>
      </div>
    </div>
  );
}

export default ModeSelect;
