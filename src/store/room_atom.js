import {atom} from "recoil";

export const roomIdAtom = atom({
  key: "roomIDState",
  default: "interviewChat",
});

export const interviewDataAtom = atom({
  key: "interviewDataState",
  default: {
    "intervieweeName": "",
    "interviewTargetCompany": "삼성 SDS",
    "interviewTargetPosition": "Backend Developer",
    "interviewRecruitment": "",
    "interviewCoverLetters": [],
  },
});