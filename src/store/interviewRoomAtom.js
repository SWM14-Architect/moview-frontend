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
  default: INTERVIEW_INPUT_FORM_DEFAULT_VALUE,
  // {
  //   "intervieweeName": "",
  //   "interviewTargetCompany": "",
  //   "interviewTargetPosition": "",
  //   "interviewRecruitment": "",
  //   "interviewCoverLetters": [],
  // }
  effects_UNSTABLE: [persistAtom],
});

export const interviewResultAtom = atom({
  key: "interviewResultState",
  default: {interviewResults:[], categoryScores: {}, categoryAverages: [], categories: []},
  effects_UNSTABLE: [persistAtom],
});