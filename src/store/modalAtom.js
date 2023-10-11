import {atom} from "recoil";

export const openModalAtom = atom({
  key: "openModalState",
  /** @type {string, null} */
  default: null
});