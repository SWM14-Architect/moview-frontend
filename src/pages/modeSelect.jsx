import React, { useCallback, useRef } from "react";
import { ScrollToTop } from "../utils/scrollRestoration";
import style from "../styles/modelSelect.module.css";
import DevilIcon from "../assets/devil_icon.svg";
import CatIcon from "../assets/cat.svg";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { roomIdAtom } from "../store/interviewRoomAtom";

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
          item={
            "자소서 없이 직무 질문만 가볍게 연습하고 싶다면, 연습 모드를 선택해주세요! 반복연습해서 당신의 지식으로 만들어 보자구요!"
          }
          iconSrc={CatIcon}
        />

        {/*실전 모드 설명 컴포넌트*/}
        <ModeExplanation
          item={
            "면접이 얼마 안 남았다면, 실전 모드를 선택해서 실제 면접에 나올 수 있는 질문들을 대비하세요! (단, 자소서 입력이 필요합니다.)"
          }
          iconSrc={DevilIcon}
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
      <ol class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base m-3">
      <li class="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
          <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <svg
              class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            Select <span class="hidden sm:inline-flex sm:ml-2">Mode</span>

          </span>
        </li>

        <li class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
          <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <span class="mr-2">2</span>
            <span class="hidden sm:inline-flex sm:ml-2">Input</span>
          </span>
        </li>
        <li class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
          <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <span class="mr-2">3</span>
            <span class="hidden sm:inline-flex sm:ml-2">Interview</span>
          </span>
        </li>

        <li class="flex items-center">
          <span class="mr-2">4</span>
          Result
        </li>
      </ol>
    </div>
  );
}

// @param item : textarea에 넣을 텍스트 값, iconSrc: icon asset 주소
function ModeExplanation({ item, iconSrc }) {
  return (
    <div className={`${style.input_form}`}>
      <div className={`${style.chat_box} fadeInUpEffect`}>
        <div className={`${style.profile_box} ${style.profile_back}`}>
          <img
            src={iconSrc}
            className={`${style.profile_image}`}
            alt={"profile"}
          />
        </div>

        <TextareaForm item={item} />
      </div>
    </div>
  );
}

function TextareaForm({ item }) {
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
      onInput={handleResizeHeight}
      value={item}
    />
  );
}

export default ModeSelect;
