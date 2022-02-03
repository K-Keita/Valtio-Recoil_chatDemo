import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { Chat } from "src/components/chat";

//recoil
export const arrState = atom({
  key: "arrState",
  default: [
    { a: "test1", b: "1/1 11:11" },
    { a: "test2", b: "1/1 11:11" },
  ],
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

  // コンポーネント内部に記述
  const deleteText = (i: number) => {
    const newArr = [...arr].filter((x, index) => index !== i);
    setArr(newArr);
  };

  const addText = (text: string) => {
    const d = new Date();

    const createdAt = `${
      d.getMonth() + 1
    }/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
    const newArr = [...arr, { a: text, b: createdAt }];
    setArr(newArr);
  };

  return (
    <div className="md:w-1/2 p-5">
      <p className="text-2xl">Recoil</p>
      {arr.map((value, i) => {
        return <Chat key={i} arr={value} i={i} delete={deleteText} />;
      })}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("text")}
          className="block p-1 my-3 w-full bg-white bg-opacity-10 border border-gray-500"
        />
        <button
          className="bg-blue-500 px-3 py-1 ml-auto block text-white"
          onSubmit={handleSubmit(onSubmit)}
        >
          送信
        </button>
      </form>
    </div>
  );
};
