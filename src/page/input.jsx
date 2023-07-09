import React, { useState } from 'react';
import Header from "./layout/header";
import Footer from "./layout/footer";

function Input() {
    const [jobGroup, setJobGroup] = useState('');
    const [recruitAnnouncement, setRecruitAnnouncement] = useState('');
    const [essay, setEssay] = useState([
        { question: '', answer: '' },
    ]);

    const handleQuestionChange = (index, value) => {
        const newEssay = [...essay];
        newEssay[index].question = value;
        setEssay(newEssay);
    }

    const handleAnswerChange = (index, value) => {
        const newEssay = [...essay];
        newEssay[index].answer = value;
        setEssay(newEssay);
    }

    const addEssayField = () => {
        setEssay([...essay, { question: '', answer: '' }]);
    }

    const handleSubmit = () => {
        // 제출 버튼이 눌렸을 때의 동작을 정의합니다.
    }

    return (
        <div className="Input">
            <Header />

            <div className="form">
                <input type="text" value={jobGroup} onChange={(e) => setJobGroup(e.target.value)} placeholder="직군" />
                <input type="text" value={recruitAnnouncement} onChange={(e) => setRecruitAnnouncement(e.target.value)} placeholder="공고" />
                <hr />

                {essay.map((item, index) => (
                    <div key={index}>
                        <input type="text" value={item.question} onChange={(e) => handleQuestionChange(index, e.target.value)} placeholder={`자소서 문항 ${index + 1}`} />
                        <textarea value={item.answer} onChange={(e) => handleAnswerChange(index, e.target.value)} placeholder={`자소서 작성한 것 ${index + 1}`} />
                        <hr />
                    </div>
                ))}

                <button className="big-button" onClick={addEssayField}>+</button>
                <button className="big-button" onClick={handleSubmit}>제출하기</button>
            </div>

            <Footer />
        </div>
    );
}

export default Input;
