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
