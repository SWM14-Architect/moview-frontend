import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";
import {INTERVIEW_INPUT_FORM_DEFAULT_VALUE} from "../constants/interviewRoomConst";

/*
key: 키는 해당 전역변수를 구분하기 위한 유니크값
default: 해당 전역변수의 Default값, 초기값입니다.
effects_UNSTABLE: [persistAtom], Optional한 부분입니다. 해당 코드가 있으면 브라우저의 로컬스토리지에 값이 저장됩니다. (새로고침에도 값이 유지됩니다.)
*/

const {persistAtom} = recoilPersist();

export const roomIdAtom = atom({
  key: "roomIDState",
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


export const interviewQuestionAtom = atom({
  key: "interviewQuestionState",
  default: {
    /** @type {Array<{_id: string, content: string, feedback: number, is_initial: boolean, is_done: boolean}>} */
    "initialQuestions": [],
    "askedQuestions": [],
    "lastIndex": 0,
    "lastContent": "",
    "initialQuestionIndex": 0,
    "followupQuestionCount": 0,
  },
  effects_UNSTABLE: [persistAtom],
})

export const interviewResultAtom = atom({
  key: "interviewResultState",
  default: {interviewResults:[], categoryScores: {}, categoryAverages: [], categories: []},
  effects_UNSTABLE: [persistAtom],
});