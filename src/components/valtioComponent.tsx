import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Chat } from "src/components/chat";
import { proxy, useSnapshot } from "valtio";

// valtio
export const state = proxy<{ arr: { value: string; createdAt: string }[] }>({
  arr: [
    { value: "test1", createdAt: "1/1 11:11" },
    { value: "test2", createdAt: "2/2 22:22" },
  ],
});

// コンポーネントの外部で記述、破壊的メソッドを使える
const deleteText = (i: number) => {
  state.arr.splice(i, 1);
};

const addText = (text: string) => {
  const d = new Date();
  const createdAt = `${
    d.getMonth() + 1
  }/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;

  state.arr.push({ value: text, createdAt: createdAt });
};

export const ValtioComponent = (): JSX.Element => {
  const { register, handleSubmit, reset } = useForm<{ text: string }>();
  const onSubmit: SubmitHandler<{ text: string }> = (data) => {
    if (data.text === "") {
      return false;
    }
    addText(data.text);
    reset();
  };

  // useSnapshotで状態を取得
  const { arr } = useSnapshot(state);

  return (
    <div className="p-5 md:w-1/2">
      <p className="text-3xl font-bold">valtio</p>
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
      </form>
    </div>
  );
};
