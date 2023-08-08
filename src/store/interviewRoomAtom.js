import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";
import {INTERVIEW_INPUT_FORM_DEFAULT_VALUE} from "../constants/interviewRoomConst";

const {persistAtom} = recoilPersist();

export const roomIdAtom = atom({
  key: "roomIDState",
  default: "interviewInput",
  effects_UNSTABLE: [persistAtom],
});

export const interviewDataAtom = atom({
  key: "interviewDataState",
  default: INTERVIEW_INPUT_FORM_DEFAULT_VALUE,
  effects_UNSTABLE: [persistAtom],
});

export const interviewResultAtom = atom({
  key: "interviewResultState",
  default: {interviewResults:[], categoryScores: {}, categoryAverages: [], categories: []}
});