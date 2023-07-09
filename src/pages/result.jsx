import React, { useState } from 'react';
import Header from "../components/header"
import Footer from "../components/footer"

function Result() {
    const [value, setValue] = useState({
        questionValue: 50,
        goodAspectValue: 50,
        badAspectValue: 50
    });

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="Result">
            <Header />

            <div className="content">
                <h2>문제 1</h2>
                <textarea placeholder="면접 질문"></textarea>
                <textarea placeholder="면접 답변"></textarea>
                <textarea placeholder="좋은 점"></textarea>
                <textarea placeholder="아쉬운 점"></textarea>

                <label>
                    적절한 면접 질문을 제공했나요?
                    <input type="range" min="0" max="100" value={value.questionValue} onChange={handleChange} name="questionValue" />
                </label>

                <label>
                    면접 답변의 좋은 점을 잘 분석 했나요?
                    <input type="range" min="0" max="100" value={value.goodAspectValue} onChange={handleChange} name="goodAspectValue" />
                </label>

                <label>
                    면접 답변의 아쉬운 점을 잘 분석 했나요?
                    <input type="range" min="0" max="100" value={value.badAspectValue} onChange={handleChange} name="badAspectValue" />
                </label>
                <hr />
                
                {/* 여기에 필요한 만큼의 꼬리질문과 관련 폼들을 추가합니다. */}
            </div>

            <button className="big-button">다음으로</button>

            <Footer />
        </div>
    );
}

export default Result;
