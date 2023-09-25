import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";


const {persistAtom} = recoilPersist();

export const userLoginAtom = atom({
  key: "userLoginState",
  /** @type {boolean} */
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const userNicknameAtom = atom({
  key: "userNicknameState",
  /** @type {string} */
  default: "",
  effects_UNSTABLE: [persistAtom],
})

export const userProfileAtom = atom({
  key: "userProfileState",
  /** @type {string} */
  default: "",
  effects_UNSTABLE: [persistAtom],
})