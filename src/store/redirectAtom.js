import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";


const {persistAtom} = recoilPersist();

export const redirectAtom = atom({
  key: "redirectState",
  /** @type {string | null} */
  default: null,
  effects_UNSTABLE: [persistAtom],
})