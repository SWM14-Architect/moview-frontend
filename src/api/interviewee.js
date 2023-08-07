import axios from 'axios';

// 기본 URL 설정
const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}/api/interviewee`,
  withCredentials: true, // 쿠키(세션 ID)를 전달하기 위한 CORS 설정
});

export const session = () => {
  return apiClient.post('/session')
  .then(response => response.data)
  .catch(error => {
    throw error;
  });
}

// 자소서 분석, 초기 질문리스트 생성
export const input = ({intervieweeName, jobGroup, recruitAnnouncement, coverLetterQuestions, coverLetterAnswers}) => {
  // 입력 검증
  if (typeof intervieweeName !== 'string') throw new Error("Invalid input: Interviewee Name");
  if (typeof jobGroup !== 'string') throw new Error('Invalid input: Job Group');
  if (typeof recruitAnnouncement !== 'string') throw new Error('Invalid input: Recruitment Announcement');
  if (!Array.isArray(coverLetterQuestions)) throw new Error('Invalid input: Cover Letter Questions');
  if (!Array.isArray(coverLetterAnswers)) throw new Error('Invalid input: Cover Letter Answers');

  // JSON 형식으로 requestBody 구성
  const requestBody = {
    "interviewee_name":intervieweeName,
    "job_group":jobGroup,
    "recruit_announcement":recruitAnnouncement,
    "cover_letter_questions":coverLetterQuestions,
    "cover_letter_answers":coverLetterAnswers,
  };

  // response {flag,content}
  return apiClient.post('/input', requestBody)
  .then(response => response.data)
  .catch(error => {
    throw error;
  });
};

// 인터뷰 플래그에 따른 응답
export const answer = ({answer}) => {
  // 입력 검증
  if (typeof answer !== 'string')
    throw new Error('Invalid input: Interviewee Answer');

  // JSON 형식으로 requestBody 구성
  const requestBody = {
    "answer": answer,
  };

  return apiClient.post('/answer', requestBody)
  .then(response => response.data)
  .catch(error => {
    throw error;
  });
};

// 유저의 서비스평가를 받고, 종료
export const feedback = ( {feedbackList} ) => {
  // feedbackList의 형식을 검사하는 함수
  const isValidFeedbackList = list => {
    if (!Array.isArray(list)) return false;

    return list.every(item => {
      // 각 항목이 객체이고 'category', 'content' 키를 가지고 있는지 확인
      return typeof item === 'object'
          && typeof item.feedbackCategory === 'string'
          && typeof item.feedbackContent === 'string';
    });
  };

  // 입력 검증
  if (!isValidFeedbackList(feedbackList))
    throw new Error('Invalid input: Feedback List');

  // JSON 형식으로 requestBody 구성
  const requestBody = {
    "feedbackList": feedbackList
  };

  return apiClient.post('/feedback', requestBody)
  .catch(error => {
    throw error;
  });
};
