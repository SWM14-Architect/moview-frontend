import {API_INSTANCE_TO_INJECT_TOKEN} from "./api_instance";
import {
  MAX_COMPANY_NAME_LENGTH,
  MAX_POSITION_NAME_LENGTH,
  MAX_RECRUITMENT_LENGTH,
  MAX_COVERLETTER_QUESTION_LENGTH,
  MAX_COVERLETTER_ANSWER_LENGTH,
  MAX_KEYWORD_LENGTH,
} from "../constants/interviewInputConst";
import {
  MAX_INTERVIEW_ANSWER_LENGTH,
} from "../constants/interviewChatConst";

// 자소서 분석, 초기 질문리스트 생성
export const input_api = ({intervieweeName, companyName, jobGroup, recruitAnnouncement, coverLetterQuestions, coverLetterAnswers}) => {
  // 입력 검증
  if (typeof intervieweeName !== 'string') throw new Error("Invalid input: Interviewee Name");
  if (typeof companyName !== 'string') throw new Error('Invalid input: Company Name')
  if (typeof jobGroup !== 'string') throw new Error('Invalid input: Job Group');
  if (typeof recruitAnnouncement !== 'string') throw new Error('Invalid input: Recruitment Announcement');
  if (!Array.isArray(coverLetterQuestions)) throw new Error('Invalid input: Cover Letter Questions');
  if (!Array.isArray(coverLetterAnswers)) throw new Error('Invalid input: Cover Letter Answers');

  // 길이 검증
  if (companyName.length > MAX_COMPANY_NAME_LENGTH) throw new Error(`Company name should not exceed ${MAX_COMPANY_NAME_LENGTH} characters.`);
  if (jobGroup.length > MAX_POSITION_NAME_LENGTH) throw new Error(`Job group should not exceed ${MAX_POSITION_NAME_LENGTH} characters.`);
  if (recruitAnnouncement.length > MAX_RECRUITMENT_LENGTH) throw new Error(`Recruitment announcement should not exceed ${MAX_RECRUITMENT_LENGTH} characters.`);

  coverLetterQuestions.forEach((question, index) => {
    if (question.length > MAX_COVERLETTER_QUESTION_LENGTH) throw new Error(`Question at index ${index} should not exceed ${MAX_COVERLETTER_QUESTION_LENGTH} characters.`);
  });

  coverLetterAnswers.forEach((answer, index) => {
    if (answer.length > MAX_COVERLETTER_ANSWER_LENGTH) throw new Error(`Answer at index ${index} should not exceed ${MAX_COVERLETTER_ANSWER_LENGTH} characters.`);
  });

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
  return API_INSTANCE_TO_INJECT_TOKEN.post('/interview/input', requestBody)
  .then(response => response.data)
  .catch(error => {
    throw error;
  });
};

// 자소서 없이 직무 질문만 생성
export const light_api=({intervieweeName, companyName, jobGroup, keyword})=>{
  //입력 검증
  if (typeof intervieweeName !== 'string') throw new Error("Invalid input: Interviewee Name");
  if (typeof companyName !== 'string') throw new Error('Invalid input: Company Name')
  if (typeof jobGroup !== 'string') throw new Error('Invalid input: Job Group');
  if (typeof keyword !== 'string') throw new Error('Invalid input: Keyword');

  // 길이 검증
  if (companyName.length > MAX_COMPANY_NAME_LENGTH) throw new Error(`Company name should not exceed ${MAX_COMPANY_NAME_LENGTH} characters.`);
  if (jobGroup.length > MAX_POSITION_NAME_LENGTH) throw new Error(`Job group should not exceed ${MAX_POSITION_NAME_LENGTH} characters.`);
  if (keyword.length > MAX_KEYWORD_LENGTH) throw new Error(`Keyword should not exceed ${MAX_KEYWORD_LENGTH} characters.`);

  // JSON 형식으로 requestBody 구성
  const requestBody = {
    "interviewee_name":intervieweeName,
    "company_name":companyName,
    "job_group":jobGroup,
    "keyword":keyword,
  };
  // response {flag,content}
  return API_INSTANCE_TO_INJECT_TOKEN.post('/interview/light', requestBody)
  .then(response => response.data)
  .catch(error => {
    throw error;
  });
}

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

  // 길이 검증
  if (answer_content.length > MAX_INTERVIEW_ANSWER_LENGTH) throw new Error(`Answer should not exceed ${MAX_INTERVIEW_ANSWER_LENGTH} characters.`);

  // JSON 형식으로 requestBody 구성
  const requestBody = {
    "interview_id": interview_id,
    "question_id": question_id,
    "question_content": question_content,
    "answer_content": answer_content,
  };

  return API_INSTANCE_TO_INJECT_TOKEN.post('/interview/answer', requestBody)
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

  return API_INSTANCE_TO_INJECT_TOKEN.post('/interview/evaluation', requestBody)
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

  return API_INSTANCE_TO_INJECT_TOKEN.post('/interview/feedback', requestBody)
  .catch(error => {
    throw error;
  });
};

export const tts_api = ( {interview_id, text} ) => {
  // 입력 검증
  if (typeof text !== 'string') throw new Error('Invalid input: Text');

  // 길이 검증
  if (text.length > MAX_INTERVIEW_ANSWER_LENGTH) throw new Error(`Text should not exceed ${MAX_INTERVIEW_ANSWER_LENGTH} characters.`);

  // JSON 형식으로 requestBody 구성
  const requestBody = {
    "interview_id": interview_id,
    "text": text,
  };

  return API_INSTANCE_TO_INJECT_TOKEN.post('/interview/tts', requestBody)
  .then(response => response.data)
  .catch(error => {
    throw error;
  });
}

export const stt_api = ( {interview_id, audio_data} ) => {
  // 입력 검증(base64로 인코딩 되어있는 오디오 데이터)
  if (typeof audio_data !== 'string') throw new Error('Invalid input: Audio Data');

  // JSON 형식으로 requestBody 구성
  const requestBody = {
    "interview_id": interview_id,
    "audio_data": audio_data,
  }

  return API_INSTANCE_TO_INJECT_TOKEN.post('/interview/stt', requestBody)
  .then(response => response.data)
  .catch(error => {
    throw error;
  });
}