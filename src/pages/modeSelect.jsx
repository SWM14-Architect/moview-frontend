import React, { useCallback, useState, useRef } from "react";
import { ScrollToTop } from "../utils/scrollRestoration";
import style from "../styles/modelSelect.module.css";
import DevilIcon from "../assets/devil_icon.svg";
import CatIcon from "../assets/cat.svg";

function ModeSelect() {
  ScrollToTop();

  return (
    <section style={{ backgroundColor: "#f4f7fb", flex: 1 }}>
      <div className={`container`} style={{ flexDirection: "column" }}>
        {/* 타이틀 컴포넌트 */}
        <div className={`fadeInUpEffect`}>
          <div className={`${style.header}`}>모드 선택</div>
        </div>
        <ModeExplanation
          item={
            "자소서 없이 직무 질문만 가볍게 연습하고 싶다면, Light 모드를 선택해주세요! 반복연습해서 당신의 지식으로 만들어 보자구요!"
          }
          iconSrc={CatIcon}
        />

        <ModeExplanation
          item={
            "면접이 얼마 안 남았다면, 실전 모드를 선택해서 합격률을 높이세요! 단, 실제 면접에는 자소서를 보고 진행하기 때문에 자소서 입력이 필요합니다."
          }
          iconSrc={DevilIcon}
        />
      </div>
    </section>
  );
}

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

function LightMode() {}

function HeavyMode() {}

export default ModeSelect;
