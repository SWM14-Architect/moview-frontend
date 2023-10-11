'use client';
import React, {useEffect, useRef, useState} from 'react';
import { Button, Modal } from 'flowbite-react';
import {useRecoilState} from "recoil";
import {openModalAtom} from "../store/modalAtom";
import style from "../styles/feedbackModal.module.css";
import {MAX_FEEDBACK_CONTENT_LENGTH} from "../constants/interviewFeedbackConst";
import {slack_feedback_api} from "../api/slack";
import {toast} from "react-toastify";
import {roomIdAtom} from "../store/interviewRoomAtom";
import {useNavigate} from "react-router-dom";

function TextareaForm({ placeholder, item, onChange, charCount, styles = {} }) {
  const textRef = useRef(null);

  // Textarea height auto resize
  useEffect(() => {
    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  })

  return (
    <div>
      <textarea
        ref={textRef}
        className={`${style.input_form_textbox}`}
        placeholder={placeholder}
        onChange={(e) => (onChange(e))}
        style={styles}
        value={item}
      />
      <div className={style.char_count}>{`${charCount} / ${MAX_FEEDBACK_CONTENT_LENGTH}자`}</div>
    </div>
  );
}

function FeedbackModal(){
  const navigate = useNavigate();
  const [roomId, ] = useRecoilState(roomIdAtom);
  const [openModal, setOpenModal] = useRecoilState(openModalAtom);
  const [content, setContent] = useState("");
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setContent("");
    setCharCount(0);
  }, [openModal]);

  function handleOnChange(e) {
    if(e.target.value.length > MAX_FEEDBACK_CONTENT_LENGTH){
      setContent(e.target.value.substring(0, MAX_FEEDBACK_CONTENT_LENGTH));
    } else {
      setContent(e.target.value);
      setCharCount(e.target.value.length);
    }
  }

  function handleOnSubmit() {
    slack_feedback_api({"user_message": content})
      .then((res) => {
        toast.info("소중한 피드백 감사합니다!");
        setOpenModal(null);
        if(roomId === "interviewFeedback"){
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(`${err.response?.data.message ? err.response.data.message.error : "오류가 발생했습니다!\n" + err.message}`, {});
      });
  }

  function handleOnClose() {
    setOpenModal(null);
    if(roomId === "interviewFeedback"){
      navigate("/");
    }
  }

  return (
    <Modal show={openModal === 'feedback'} onClose={() => handleOnClose()}>
      <Modal.Header>Feedback</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            서비스 개선을 위한 피드백을 남겨주세요.
          </p>
          <TextareaForm placeholder={"내용"} item={content} charCount={charCount} onChange={handleOnChange} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleOnSubmit()}>보내기</Button>
        <Button color="gray" onClick={() => handleOnClose()}>
          나가기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FeedbackModal;