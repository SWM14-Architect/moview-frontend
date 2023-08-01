import {atom} from "recoil";

export const roomIdAtom = atom({
  key: "roomIDState",
  default: "interviewFeedback",
});

export const interviewDataAtom = atom({
  key: "interviewDataState",
  default: {
    "intervieweeName": "소마인",
    "interviewTargetCompany": "삼성 SDS",
    "interviewTargetPosition": "Backend Developer",
    "interviewRecruitment": "",
    "interviewCoverLetters": [],
  },
});