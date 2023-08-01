import axios from 'axios';

// 기본 URL 설정
const apiClient = axios.create({
  baseURL: '/api/interviewee',
  withCredentials: true, // 쿠키(세션 ID)를 전달하기 위한 CORS 설정
});

// 자소서 분석, 초기 질문리스트 생성
export const input = ( {jobGroup, recruitmentAnnouncement, coverLetterList} ) => {
  // selfIntroductionList의 형식을 검사하는 함수
  const isValidCoverLetterList = list => {
    if (!Array.isArray(list)) return false;

    return list.every(item => {
      // 각 항목이 객체이고 'question', 'answer' 키를 가지고 있는지 확인
      return typeof item === 'object'
          && typeof item.coverLetterQuestion === 'string'
          && typeof item.coverLetterAnswer === 'string';
    });
  };

  // 입력 검증
  if (typeof jobGroup !== 'string'
      || typeof recruitmentAnnouncement !== 'string'
      || !isValidCoverLetterList(coverLetterList)) {
    console.error('Invalid input');
    throw new Error('Invalid input');
  }

  // JSON 형식으로 requestBody 구성
  const requestBody = { jobGroup, recruitmentAnnouncement, coverLetterList };

  return apiClient.post('/input', requestBody)
  .then(response => response.data)
  .catch(error => {
    console.error('input API error:', error);
    throw error;
  });
};

// 인터뷰 플래그에 따른 응답
export const answer = ( {initialQuestionIndex, followUpQuestionIndex, currentQuestion, intervieweeAnswer} ) => {
  // 입력 검증
  if (typeof initialQuestionIndex !== 'number'
      || typeof followUpQuestionIndex !== 'number'
      || typeof currentQuestion !== 'string'
      || typeof intervieweeAnswer !== 'string') {
    console.error('Invalid input');
    throw new Error('Invalid input');
  }

  // JSON 형식으로 requestBody 구성
  const requestBody = { initialQuestionIndex, followUpQuestionIndex, currentQuestion, intervieweeAnswer };

  return apiClient.post('/answer', requestBody)
  .then(response => response.data)
  .catch(error => {
    console.error('answer API error:', error);
    throw error;
  });
};

// 유저의 서비스평가를 받고, 종료
export const feedback = ( {feedbackList} ) => {
  // 입력 검증: feedbackList는 객체의 배열이어야 함
  if (!Array.isArray(feedbackList) || !feedbackList.every(item => typeof item === 'object')) {
    console.error('Invalid feedbackList input');
    throw new Error('Invalid feedbackList input');
  }

  // JSON 형식으로 requestBody 구성
  const requestBody = { feedbackList };

  return apiClient.post('/feedback', requestBody)
  .catch(error => {
    console.error('feedback API error:', error);
    throw error;
  });
};
