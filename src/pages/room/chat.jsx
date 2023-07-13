import React, {useState, useRef, useEffect} from "react";
import "../../styles/button.css";
import "../../styles/outer-div.css";
import "../../styles/chat.css";
import userIcon from "../../assets/human-icon.png";
import botIcon from "../../assets/bot-icon.png";

function UserIcon() {
  return (
    <img src={userIcon} alt="userIcon" />
  );
}

function AssistantIcon() {
  return (
    <img src={botIcon} alt="botIcon" />
  );
}

function Chat(props) {
  const { setRoomID } = props;
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello humanHello humanHello humanHello humanHello humanHello humanHello humanHello humanHello humanHello humanHello humanhumanHellohumanHellohumanHell0 this is long text test no ploblem Hello humanHello humanHello humanHello humanHello humanHello humanHello humanHello humanHello humanHello humanHello humanhumanHellohumanHellohumanHell0 this is long text test no ploblem",
    },
    { role: "user", text: "Hello 👋" },
  ]);
  const [inputText, setInputText] = useState("");

  const inputRef = useRef();
  const buttonRef = useRef();

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // const handleSend = (e) => {
  //   e.preventDefault();
  //   if (inputText) {
  //     setMessages([...messages, { role: "user", text: inputText }]);
  //     setInputText("");
  //     // 이후에는 챗봇의 로직에 따라 'assistant'의 메시지를 추가합니다.
  //     inputRef.current?.focus();
  //     buttonRef.current?.scrollIntoView({ block: "nearest", behavior: 'smooth' });
  //   }
  // };

  const handleAddChatMessage = (e) => {
    e.preventDefault();
    setMessages([
      ...messages,
      { role: "assistant", text: "ai text" },
      { role: "user", text: "human text" },
    ]);
  };

  useEffect(() => {
    // 메시지를 제출했을 때 Button이 보이도록 스크롤합니다.
    buttonRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
    if (messages.length / 2 > 6) {
      setRoomID("result");
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }, [messages, setRoomID])

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
      <button ref={buttonRef} className="big-button" onClick={handleAddChatMessage}>
        +
      </button>
    </div>
  );
}

export default Chat;
