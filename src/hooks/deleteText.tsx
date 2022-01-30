import { state } from "src/pages/index";

export const deleteText = (i: number) => {
  state.arr.splice(i, 1);
};
