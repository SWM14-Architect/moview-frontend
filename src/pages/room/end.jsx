import React, { useRef, useEffect } from "react";
import "chart.js/auto";
import { Radar, Bar } from "react-chartjs-2";
import "../../styles/outer-div.css";
import "../../styles/end.css";
import "../../styles/button.css";

const RadarChart = () => {
  const data = {
    labels: [
      "Category A",
      "Category B",
      "Category C",
      "Category D",
      "Category E",
    ],
    datasets: [
      {
        data: [4, 3, 5, 2, 4],
        backgroundColor: "rgba(0, 123, 255, 0.25)",
        borderColor: "blue",
        borderWidth: 2,
        label: "내 점수 영역"
      },
    ],
  };

  return (
    <Radar
      data={data}
      options={{ title: { display: true, text: "Radar Chart" } }}
    />
  );
};

const BarChart = () => {
  const data = {
    labels: ["Category A", "Category B", "Category C", "Category D"],
    datasets: [
      {
        data: [10, 15, 7, 12],
        backgroundColor: "blue",
        label:"내 점수"
      },
      {
        data: [11,20,13,15],
        backgroundColor: "red",
        label: "다른 사람 평균 점수"
      },
    ],
  };

  return (
    <Bar
      data={data}
      options={{
        title: { display: true, text: "Horizontal Bar Chart" },
        scales: { xAxes: [{ ticks: { beginAtZero: true } }] },
      }}
    />
  );
};

const End = () => {
  const handleSubmit = () => {
    // 제출 버튼이 눌렸을 때의 동작을 정의합니다.
  };

  return (
    <div className="outer-div">
      <div className="chart">
        <h2>영역별 점수</h2>
        <RadarChart />
        <hr />
        <h2>다른 사람과의 점수 비교</h2>
        <BarChart />
        <hr />
      </div>

      <h2>총 평가</h2>
      <div className="end-results">
        <textarea placeholder="좋은 점" disabled />
        <textarea placeholder="아쉬운 점" disabled />
        <hr />
        <textarea
          placeholder="기타 원하시는 것이 있으면 입력해주세요~~"
        />
      </div>

      <button className="big-button" onClick={handleSubmit}>
        평가 완료
      </button>
    </div>
  );
};

export default End;
