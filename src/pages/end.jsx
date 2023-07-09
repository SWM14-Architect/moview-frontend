import React, { useRef, useEffect } from "react";
import 'chart.js/auto';
import { Radar,Bar } from 'react-chartjs-2';

const RadarChart = () => {
  const data = {
    labels: ['Category A', 'Category B', 'Category C', 'Category D', 'Category E'],
    datasets: [
      {
        data: [4, 3, 5, 2, 4],
        backgroundColor: 'rgba(0, 123, 255, 0.25)',
        borderColor: 'blue',
        borderWidth: 2,
      },
    ],
  };
  
  return <Radar data={data} options={{ title: { display: true, text: 'Radar Chart' }}} />;
};

const BarChart = () => {
  const data = {
    labels: ['Category A', 'Category B', 'Category C', 'Category D'],
    datasets: [
      {
        data: [10, 15, 7, 12],
        backgroundColor: 'blue',
      },
    ],
  };

  return (
    <Bar
      data={data}
      options={{
        title: { display: true, text: 'Horizontal Bar Chart' },
        scales: { xAxes: [{ ticks: { beginAtZero: true } }] },
      }}
    />
  );
};

const App = () => {
  return (
    <div>
      <h2>영역별 점수</h2>
      <RadarChart />
      <hr />
      <h2>다른 사람과의 점수 비교</h2>
      <BarChart />
      <hr />
      <h2>총 평가</h2>
      <textarea placeholder="좋은 점" />
      <textarea placeholder="아쉬운 점" />
      <hr />
      <input type="text" placeholder="기타 원하시는 것이 있으면 입력해주세요~~" />
      <hr />
      <button>제출</button>
    </div>
  );
};

export default App;
