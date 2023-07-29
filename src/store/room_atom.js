import {atom} from "recoil";

export const roomIdAtom = atom({
  key: "roomIDState",
  default: "interviewInput",
});

export const interviewDataAtom = atom({
  key: "interviewDataState",
  default: {
    "intervieweeName": "",
    "interviewTargetCompany": "",
    "interviewTargetPosition": "",
    "interviewRecruitment": "",
    "interviewCoverLetters": [],
  },
});