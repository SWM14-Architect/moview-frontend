import React, { useState, useRef } from 'react';
import Header from "./layout/header";
import Footer from "./layout/footer";

function Chat() {
    const [messages, setMessages] = useState([
        { role: 'user', text: 'Hello 👋' },
        { role: 'assistant', text: 'Hello human' },
    ]);
    const [inputText, setInputText] = useState('');

    const inputRef = useRef();

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSend = () => {
        if (inputText) {
            setMessages([...messages, { role: 'user', text: inputText }]);
            setInputText('');
            // 이후에는 챗봇의 로직에 따라 'assistant'의 메시지를 추가합니다.
            inputRef.current.focus();
        }
    };

    return (
        <div className="Chat">
            <Header />

            <div className="chat-window">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.role}`}>
                        <div className={message.role}>{message.text}</div>
                    </div>
                ))}

                <input
                    type="text"
                    ref={inputRef}
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="면접 답변을 입력하세요"
                />
                <button className="big-button" onClick={handleSend}>완료</button>
            </div>

            <Footer />
        </div>
    );
}

export default Chat;