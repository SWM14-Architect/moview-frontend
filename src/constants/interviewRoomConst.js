
const INTERVIEW_INPUT_FORM_DEFAULT_VALUE = {
  "intervieweeName": "",
  "interviewTargetCompany": "",
  "interviewTargetPosition": "",
  "interviewRecruitment": "",
  "interviewCoverLetters": [],
};

const QUESTION_CATEGORY_LIST_VALUE = {
  "Behavioral Questions": ["Details", "Results and Learnings", "Reaction and Coping Strategies"],
  "Situational Questions": ["Job-related Scenarios", "Scenarios Reflecting Company Culture and Values", "Adaptability and Problem-solving Skills", "Ethical Judgment"],
  "Technical Job-related Questions": ["Technical Details", "Real-world Application", "Learning and Development"],
  "Cultural Fit Questions": ["Core Values and Principles of the Company", "Teamwork and Communication Style", "Candidate's Traits and Values", "Adaptability"],
  "Personal Character Questions": ["Thinking Style and Behavioral Patterns", "Growth and Development", "Motivation and Values"]
};

/** @type {{initialQuestions: *[], askedQuestions: *[], initialQuestionIndex: number, followupQuestionCount: number, lastContent: string, lastId: string}} */
const INTERVIEW_STATE_DEFAULT_VALUE = {
  "initialQuestions": [],
  "askedQuestions": [],
  "lastId": "",
  "lastContent": "",
  "initialQuestionIndex": 0,
  "followupQuestionCount": 0,
};

const INTERVIEW_RESULT_DEFAULT_VALUE = {
  coverletterResults: [],
  interviewResults: [],
}

export { INTERVIEW_INPUT_FORM_DEFAULT_VALUE, QUESTION_CATEGORY_LIST_VALUE, INTERVIEW_STATE_DEFAULT_VALUE, INTERVIEW_RESULT_DEFAULT_VALUE };