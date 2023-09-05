import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";
import {CHAT_HISTORY_DEFAULT_VALUE} from "../constants/interviewChatConst";

const {persistAtom} = recoilPersist();

// Recoil 전역변수는 Pycharm IDE 기준으로 사용 위치를 추적할 수 있습니다.
// VSCode IDE에서도 Ctrl + 좌클릭으로 참조중인 위치를 추적할 수 있네요.
export const chatHistoryAtom = atom({
  key: "chatHistoryState",
  default: CHAT_HISTORY_DEFAULT_VALUE,
  // list({type:"AI" or "Human", content: string}, ...)
  // CHAT_HISTORY_DEFAULT_VALUE = [
  // {type:"AI",
  //  content: "안녕하세요. 저는 인공지능 면접관입니다. 제가 질문을 하면 답변을 작성하여 제출해주시면 됩니다."}
  // ]
  effects_UNSTABLE: [persistAtom],
});