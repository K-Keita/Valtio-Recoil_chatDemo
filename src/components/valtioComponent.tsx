import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Chat } from "src/components/chat";
import { proxy, useSnapshot } from "valtio";

// valtio
export const state = proxy<{ arr: { a: string; b: string }[] }>({
  arr: [
    { a: "test1", b: "1/1 11:11" },
    { a: "test2", b: "1/1 11:11" },
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
  state.arr.push({ a: text, b: createdAt });
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

  const { arr } = useSnapshot(state);

  return (
    <div className="md:w-1/2 p-5">
      <p className="text-2xl">valtio</p>
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
