import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { CHAT_HISTORY_DEFAULT_VALUE } from "../constants/interviewChatConst";

const { persistAtom } = recoilPersist();

// Recoil 전역변수는 Pycharm IDE 기준으로 사용 위치를 추적할 수 있습니다.
// VSCode IDE에서도 Ctrl + 좌클릭으로 참조중인 위치를 추적할 수 있네요.
export const chatHistoryAtom = atom({
  key: "chatHistoryState",
  /** @type {Array<{type:string, content: string}>} */
  default: CHAT_HISTORY_DEFAULT_VALUE,
  effects_UNSTABLE: [persistAtom],
});