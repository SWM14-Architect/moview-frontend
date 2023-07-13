import React, { useState } from "react";
import "../../styles/result.css";
import "../../styles/outer-div.css";

const SliderInput = ({ label, sliderValue, setSliderValue }) => {
  return (
    <>
      <label>{label}</label>
      <div className="slider-container">
        <p>0</p>
        <div className="slider-value">{sliderValue}</div>
        <p>100</p>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        onChange={(event) => setSliderValue(event.target.value)}
      />
    </>
  );
};

const sections = [
  {
    title: "문제",
    labels: [
      "적절한 면접 질문을 제공했나요?",
      "좋은 점이 잘 분석됬나요?",
      "아쉬운 점이 잘 분석됬나요?",
    ],
  },
  {
    title: "문제에 대한 꼬리질문 1",
    labels: [
      "적절한 면접 질문을 제공했나요?",
      "좋은 점이 잘 분석됬나요?",
      "아쉬운 점이 잘 분석됬나요?",
    ],
  },
  {
    title: "문제에 대한 꼬리질문 2",
    labels: [
      "적절한 면접 질문을 제공했나요?",
      "좋은 점이 잘 분석됬나요?",
      "아쉬운 점이 잘 분석됬나요?",
    ],
  },
];

const Result = (props) => {
  const { setRoomID } = props;
  const [sliderValues, setSliderValues] = useState(
    Array(sections.reduce((a, b) => a + b.labels.length, 0)).fill(50)
  );

  const handleSliderChange = (index) => (value) => {
    const newSliderValues = [...sliderValues];
    newSliderValues[index] = value;
    setSliderValues(newSliderValues);
  };

  let sliderIndex = 0;

  return (
    <div className="outer-div">
      <div className="form">
        {sections.map((section, sectionIndex) => (
          <div className="section" key={sectionIndex}>
            <h2>{section.title}</h2>
            <textarea placeholder="면접 질문" disabled />
            <textarea placeholder="면접 답변" disabled />
            <textarea placeholder="좋은 점" disabled />
            <textarea placeholder="아쉬운 점" disabled />

            {section.labels.map((label) => {
              const currentSliderIndex = sliderIndex;
              sliderIndex++;
              return (
                <SliderInput
                  key={currentSliderIndex}
                  label={label}
                  sliderValue={sliderValues[currentSliderIndex]}
                  setSliderValue={handleSliderChange(currentSliderIndex)}
                />
              );
            })}
            <hr />
          </div>
        ))}

        <div className="big-button-div">
          <button className="big-button left">이전으로</button>
          <button className="big-button right">다음으로</button>
        </div>
      </div>
    </div>
  );
};

export default Result;
