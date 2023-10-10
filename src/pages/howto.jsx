import style from "../styles/interviewFeedback.module.css";
import React, { useState } from "react";
import HowToSelectMode from "../assets/howto/how-to-select-mode.png";
import HowToLight from "../assets/howto/how-to-light.png";
import HowToAddRequirements from "../assets/howto/how-to-add-req.png";
import HowToInput from "../assets/howto/how-to-input.jpeg";
import HowToChatType from "../assets/howto/how-to-chat-type.png";
import HowToChatMicOn from "../assets/howto/how-to-chat-mic-on.png";
import HowToChatMicOff from "../assets/howto/how-to-chat-mic-off.png";
import HowToChatMicEdit from "../assets/howto/how-to-chat-mic-edit.png";

function HowTo() {
  return (
    <section style={{ backgroundColor: "#f4f7fb", flex: 1 }}>
      <div className={`container`} style={{ flexDirection: "column" }}>
        <div>
          {features.map((feature, index) => (
            <div key={index}>
              <Accordion
                index={index}
                title={feature.title}
                content={feature.content}
                source={feature.source}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    title: "모드 선택",
    content: "연습 모드, 실전 모드 중 하나를 선택하세요.",
    source: HowToSelectMode,
  },
  {
    title: "연습 모드 입력 예시",
    content: "다음 예시처럼 작성해주시면 됩니다.",
    source: HowToLight,
  },
  {
    title: "실전 모드에서 자소서 추가하는 방법",
    content : "+ 버튼을 클릭하시면 됩니다. 최대 5개까지 입력 가능합니다.",
    source: HowToAddRequirements,
  },
  {
    title: "실전 모드 입력 예시",
    content: "다음 예시처럼 작성해주시면 됩니다.",
    source: HowToInput,
  },
  {
    title: "면접 입력 텍스트로 하는 방법",
    content: "다음 예시처럼 작성해주시면 됩니다.",
    source: HowToChatType,
  },

  {
    title: "마이크 키는 방법",
    content: "다음 아이콘을 클릭하십시오.",
    source: HowToChatMicOn,
  },
  {
    title: "면접 입력 시 마이크 사용하는 방법",
    content: "다음 아이콘인 상태에서 말을 하십시오. 그리고 말을 마치면 마이크 아이콘을 클릭하십시오.",
    source: HowToChatMicOff,
  },
  {
    title: "음성 인식된 문장 수정하는 방법",
    content: "다음 영역을 직접 텍스트로 수정하면 됩니다.",
    source: HowToChatMicEdit,
  }
];

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
          <span>
            {props.index + 1} . {props.title}
          </span>
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
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                {props.content}
              </span>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
              <img src={props.source} alt="source" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowTo;
