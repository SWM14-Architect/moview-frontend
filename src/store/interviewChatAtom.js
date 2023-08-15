import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";
import {CHAT_HISTORY_DEFAULT_VALUE} from "../constants/interviewChatConst";

const {persistAtom} = recoilPersist();

export const chatHistoryAtom = atom({
  key: "chatHistoryState",
  default: CHAT_HISTORY_DEFAULT_VALUE, // list({type:"AI" or "Human", isShown: boolean, content: string}, ...)
  effects_UNSTABLE: [persistAtom],
});