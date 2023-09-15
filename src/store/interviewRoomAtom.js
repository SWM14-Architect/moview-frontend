import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";
import {
  INTERVIEW_INPUT_FORM_DEFAULT_VALUE,
  INTERVIEW_RESULT_DEFAULT_VALUE,
  INTERVIEW_STATE_DEFAULT_VALUE
} from "../constants/interviewRoomConst";

/*
key: 키는 해당 전역변수를 구분하기 위한 유니크값
default: 해당 전역변수의 Default값, 초기값입니다.
effects_UNSTABLE: [persistAtom], Optional한 부분입니다. 해당 코드가 있으면 브라우저의 로컬스토리지에 값이 저장됩니다. (새로고침에도 값이 유지됩니다.)
*/

const {persistAtom} = recoilPersist();

export const roomIdAtom = atom({
  key: "roomIDState",
  /** @type {string} */
  default: "interviewChat",
  effects_UNSTABLE: [persistAtom],
});

export const interviewDataAtom = atom({
  key: "interviewDataState",
  /** @type {{
   * intervieweeName: string,
   * interviewTargetCompany: string,
   * interviewTargetPosition: string,
   * interviewRecruitment: string,
   * interviewCoverLetters: Array<{question: string, content: string}>}}*/
  default: INTERVIEW_INPUT_FORM_DEFAULT_VALUE,
  effects_UNSTABLE: [persistAtom],
});


export const interviewStateAtom = atom({
  key: "interviewStateState",
  /** @type {{
   * initialQuestions: Array<{_id: string, content: string, feedback: number, is_initial: boolean, is_done: boolean}>,
   * askedQuestions: Array<{_id: string, content: string, feedback: number, is_initial: boolean, is_done: boolean}>,
   * lastId: string,
   * lastContent: string,
   * initialQuestionIndex: number,
   * followupQuestionCount: number}}*/
  default: INTERVIEW_STATE_DEFAULT_VALUE,
  effects_UNSTABLE: [persistAtom],
});

export const interviewIdAtom = atom({
  key: "interviewIdState",
  /** @type {string} */
  default: "",
  effects_UNSTABLE: [persistAtom],
})

export const interviewResultAtom = atom({
  key: "interviewResultState",
  /** @type {{
   * interviewResults: Array<{question: string, answer: string, category: string, score: number, analysis: string}>,
   * categoryScores: {},
   * categoryAverages: [],
   * categories: []}}
   */
  default: INTERVIEW_RESULT_DEFAULT_VALUE,
  effects_UNSTABLE: [persistAtom],
});