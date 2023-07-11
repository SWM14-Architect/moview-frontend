import React, { useState } from "react";
import "../styles/button.css";
import "../styles/outer-div.css";
import "../styles/form.css";
import "../styles/divider.css";

function Input() {
  const [jobGroup, setJobGroup] = useState("");
  const [recruitAnnouncement, setRecruitAnnouncement] = useState("");
  const [essay, setEssay] = useState([{ question: "", answer: "" }]);

  const handleQuestionChange = (index, value) => {
    const newEssay = [...essay];
    newEssay[index].question = value;
    setEssay(newEssay);
  };

  const handleAnswerChange = (index, value) => {
    const newEssay = [...essay];
    newEssay[index].answer = value;
    setEssay(newEssay);
  };

  const addEssayField = () => {
    setEssay([...essay, { question: "", answer: "" }]);
  };

  const handleSubmit = () => {
    // 제출 버튼이 눌렸을 때의 동작을 정의합니다.
  };

  return (
    <div className="outer-div">
      <div className="form">
        <div>
          <label>
            직군
            <input
              type="text"
              value={jobGroup}
              onChange={(e) => setJobGroup(e.target.value)}
            />
          </label>

          <label>
            공고
            <textarea
              value={recruitAnnouncement}
              onChange={(e) => setRecruitAnnouncement(e.target.value)}
            />
          </label>
          <hr />
        </div>

        {essay.map((item, index) => (
          <div key={index}>
            <label>
              자소서 문항 {index + 1}
              <input
                type="text"
                value={item.question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
              />
            </label>

            <label>
              자소서 답변 {index + 1}
              <textarea
                value={item.answer}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
            </label>
            <hr />
          </div>
        ))}

        <div className="big-button-div">
          <button className="big-button left" onClick={addEssayField}>
            추가하기
          </button>
          <button className="big-button right" onClick={handleSubmit}>
            제출하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Input;
