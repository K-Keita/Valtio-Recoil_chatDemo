import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { Chat } from "src/components/chat";

//recoil
export const state = atom({
  key: "state",
  default: [
    { value: "test1", createdAt: "1/1 11:11" },
    { value: "test2", createdAt: "2/2 22:22" },
  ],
});

export const countState = selector({
  key: "countState",
  //stateの値を操作した値を返す
  get: ({ get }) => {
    // get()の引数に指定のatomを入れ、取得
    const text = get(state);

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

  // useRecoilStateで状態を取得
  const [arr, setArr] = useRecoilState(state);

  // コンポーネント内部に記述
  const deleteText = (i: number) => {
    const newArr = [...arr].filter((x, index) => {
      return index !== i;
    });
    setArr(newArr);
  };

  const addText = (text: string) => {
    const d = new Date();

    const createdAt = `${
      d.getMonth() + 1
    }/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
    const newArr = [...arr, { value: text, createdAt: createdAt }];
    setArr(newArr);
  };

  const count = useRecoilValue(countState);

  return (
    <div className="p-5 md:w-1/2">
      <p className="text-3xl font-bold">Recoil</p>
      {arr.map((value, i) => {
        return <Chat key={i} items={value} i={i} delete={deleteText} />;
      })}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("text")}
          className="block p-1 my-3 w-full bg-white border border-gray-500"
        />
        <button
          className="block py-1 px-3 ml-auto text-white bg-blue-500 hover:bg-blue-500/90"
          onSubmit={handleSubmit(onSubmit)}
        >
          送信
        </button>
        {count}
      </form>
    </div>
  );
};
