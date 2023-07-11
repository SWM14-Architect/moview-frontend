import React, { useState, useRef } from "react";
import "../styles/button.css";
import "../styles/outer-div.css";
import "../styles/chat.css";
import userIcon from "../assets/human-icon.png";
import botIcon from "../assets/bot-icon.png";

function UserIcon() {
  return (
    <div>
      <img src={userIcon} alt="userIcon" />
    </div>
  );
}

function AssistantIcon() {
  return (
    <div>
      <img src={botIcon} alt="botIcon" />
    </div>
  );
}

function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello humanHello humanHello humanHello humanHello humanHello humanHello humanHello humanHello humanHello humanHello humanhumanHellohumanHellohumanHell0 this is long text test no ploblem Hello humanHello humanHello humanHello humanHello humanHello humanHello humanHello humanHello humanHello humanHello humanhumanHellohumanHellohumanHell0 this is long text test no ploblem",
    },
    { role: "user", text: "Hello 👋" },
  ]);
  const [inputText, setInputText] = useState("");

  const inputRef = useRef();

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSend = () => {
    if (inputText) {
      setMessages([...messages, { role: "user", text: inputText }]);
      setInputText("");
      // 이후에는 챗봇의 로직에 따라 'assistant'의 메시지를 추가합니다.
      inputRef.current.focus();
    }
  };

  const handleAddChatMessage = () => {
    setMessages([
      ...messages,
      { role: "assistant", text: "ai text" },
      { role: "user", text: "human text" },
    ]);
  };

  return (
    <div className="outer-div">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div className="chat-message" key={index}>
            <div className="chat-icon">
              {message.role === "user" ? <UserIcon /> : <AssistantIcon />}
            </div>
            <div className="chat-message-content">{message.text}</div>
          </div>
        ))}

        <textarea
          className="answer-text-area"
          ref={inputRef}
          value={inputText}
          onChange={handleInputChange}
          placeholder="면접 답변을 입력하세요"
        />
      </div>
      <button className="big-button" onClick={handleAddChatMessage}>
        +
      </button>
    </div>
  );
}

export default Chat;
