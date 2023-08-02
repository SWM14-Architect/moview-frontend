import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";
import {CHAT_HISTORY_DEFAULT_VALUE} from "../constants/interviewChatConst";

const {persistAtom} = recoilPersist();

export const chatHistoryAtom = atom({
  key: "chatHistoryState",
  default: CHAT_HISTORY_DEFAULT_VALUE,
  effects_UNSTABLE: [persistAtom],
});