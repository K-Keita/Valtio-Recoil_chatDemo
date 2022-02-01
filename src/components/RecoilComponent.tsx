import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { Chat } from "src/components/chat";

//recoil
export const arrState = atom({
  key: "arrState",
  default: ["test1", "test2"],
});

export const charCountState = selector({
  key: "charCountState",
  //arrStateの値を操作した値を返す
  get: ({ get }) => {
    // get()の引数に指定のatomを入れ、取得
    const text = get(arrState);

    // 配列の個数を返す
    return text.length;
  },
});

export const RecoilComponent = (): JSX.Element => {
  const { register, handleSubmit, reset } = useForm<{ text: string }>();
  const onSubmit: SubmitHandler<{ text: string }> = (data) => {
    if (data.text === "") {
      return false;
    }
    addText(data.text);
    reset();
  };

  // const [状態変数, 状態を変更するための関数] = useRecoilState(atomのkey);
  const [arr, setArr] = useRecoilState(arrState);
  const count = useRecoilValue(charCountState);

  // コンポーネント内部に記述
  const deleteText = (i: number) => {
    const newArr = [...arr].filter((x, index) => index !== i);
    setArr(newArr);
  };

  const addText = (text: string) => {
    const newArr = [...arr, text];
    setArr(newArr);
  };

  return (
    <>
      <div className="py-24 mx-auto w-9/12">
        {arr.map((value, i) => {
          return <Chat key={i} text={value} i={i} delete={deleteText} />;
        })}
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register("text")}
            className="block py-2 px-1 my-5 mx-auto w-9/12 bg-white bg-opacity-10 border border-black"
          />
          <button onSubmit={handleSubmit(onSubmit)}>送信</button>
        </form>
        {count}
      </div>
    </>
  );
};
