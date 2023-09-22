import axios from 'axios';

const getCookie = (cookieName) => {
  let cookieValue = null;

  if (document.cookie) {
    const array = document.cookie.split(escape(cookieName) + "=");

    if (array.length >= 2) {
      const arraySub = array[1].split(";");
      cookieValue = unescape(arraySub[0]);
    }
  }

  return cookieValue;
};

// 기본 URL 설정
const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
  withCredentials: true, // 쿠키(세션 ID)를 전달하기 위한 CORS 설정
  headers: {
    'x-csrf-token': getCookie("csrf_access_token")
  }
});

export const session_api = () => {
  return apiClient.post('/interview/session')
  .then(response => response.data)
  .catch(error => {
    throw error;
  });
}

// 자소서 분석, 초기 질문리스트 생성
export const input_api = ({intervieweeName, companyName, jobGroup, recruitAnnouncement, coverLetterQuestions, coverLetterAnswers}) => {
  // 입력 검증
  if (typeof intervieweeName !== 'string') throw new Error("Invalid input: Interviewee Name");
  if (typeof companyName !== 'string') throw new Error('Invalid input: Company Name')
  if (typeof jobGroup !== 'string') throw new Error('Invalid input: Job Group');
  if (typeof recruitAnnouncement !== 'string') throw new Error('Invalid input: Recruitment Announcement');
  if (!Array.isArray(coverLetterQuestions)) throw new Error('Invalid input: Cover Letter Questions');
  if (!Array.isArray(coverLetterAnswers)) throw new Error('Invalid input: Cover Letter Answers');

  // JSON 형식으로 requestBody 구성
  const requestBody = {
    "interviewee_name":intervieweeName,
    "company_name":companyName,
    "job_group":jobGroup,
    "recruit_announcement":recruitAnnouncement,
    "cover_letter_questions":coverLetterQuestions,
    "cover_letter_answers":coverLetterAnswers,
  };

  // response {flag,content}
  return apiClient.post('/interview/input', requestBody)
  .then(response => response.data)
  .catch(error => {
    console.log('input');
    console.log(error);
    throw error;
  });
};

// 인터뷰 플래그에 따른 응답
export const answer_api = ({interview_id, question_id, question_content, answer_content}) => {
  // 입력 검증
  const regex = /^[a-z0-9]+$/;
  if (!regex.test(interview_id)) throw new Error('Invalid input: Interview ID');
  if (!regex.test(question_id)) throw new Error('Invalid input: Question ID');
  if (typeof question_content !== 'string')
    throw new Error('Invalid input: Interviewer Question');
  if (typeof answer_content !== 'string')
    throw new Error('Invalid input: Interviewee Answer');

  // JSON 형식으로 requestBody 구성
  const requestBody = {
    "interview_id": interview_id,
    "question_id": question_id,
    "question_content": question_content,
    "answer_content": answer_content,
  };

  return apiClient.post('/interview/answer', requestBody)
  .then(response => response.data)
  .catch(error => {
    throw error;
  });
};

export const evaluation_api = ({interview_id}) => {
  // 입력 검증
  const regex = /^[a-z0-9]+$/;
  if (!regex.test(interview_id)) throw new Error('Invalid input: Interview ID');

  // JSON 형식으로 requestBody 구성
  const requestBody = {
    "interview_id": interview_id,
  };

  return apiClient.post('/interview/evaluation', requestBody)
  .then(response => response.data)
  .catch(error => {
    throw error;
  });
}

// 유저의 서비스평가를 받고, 종료
export const feedback_api = ( {interview_id, question_ids, feedback_scores} ) => {
  // 입력 검증
  const regex = /^[a-z0-9]+$/;
  if (!regex.test(interview_id)) throw new Error('Invalid input: Interview ID');
  if (!Array.isArray(question_ids)) throw new Error('Invalid input: Question IDs');
  for (let question_id of question_ids) {
    if (!regex.test(question_id)) throw new Error('Invalid input: Question ID');
  }
  if (!Array.isArray(feedback_scores)) throw new Error('Invalid input: Feedback Scores');

  // JSON 형식으로 requestBody 구성
  const requestBody = {
    "interview_id": interview_id,
    "question_ids": question_ids,
    "feedback_scores": feedback_scores,
  };

  return apiClient.post('/interview/feedback', requestBody)
  .catch(error => {
    throw error;
  });
};
