import { state } from "src/pages/index";

export const addText = (text: string) => {
  if (!text) {
    return;
  }
  state.arr.push(text);
};
