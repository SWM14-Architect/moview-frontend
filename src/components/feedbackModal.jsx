'use client';
import React, {useEffect, useRef, useState} from 'react';
import { Button, Modal } from 'flowbite-react';
import {useRecoilState} from "recoil";
import {openModalAtom} from "../store/modalAtom";
import style from "../styles/feedbackModal.module.css";
import {MAX_FEEDBACK_CONTENT_LENGTH} from "../constants/interviewFeedbackConst";

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
  const [openModal, setOpenModal] = useRecoilState(openModalAtom);
  const [content, setContent] = useState("");
  const [charCount, setCharCount] = useState(0);

  function handleOnChange(e) {
    if(e.target.value.length > MAX_FEEDBACK_CONTENT_LENGTH){
      setContent(e.target.value.substring(0, MAX_FEEDBACK_CONTENT_LENGTH));
    } else {
      setContent(e.target.value);
      setCharCount(e.target.value.length);
    }
  }
  return (
    <Modal show={openModal === 'feedback'} onClose={() => setOpenModal(null)}>
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
        <Button onClick={() => setOpenModal(null)}>보내기</Button>
        <Button color="gray" onClick={() => setOpenModal(null)}>
          나가기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FeedbackModal;