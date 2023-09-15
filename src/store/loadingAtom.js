import {atom} from "recoil";

export const loadingAtom = atom({
  key: "loadingState",
  /** @type {boolean} */
  default: false,
});

export const loadingMessageAtom = atom({
  key: "loadingMessageState",
  /** @type {string} */
  default: "",
});