import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Chat } from "src/components/chat";
import { proxy, useSnapshot } from "valtio";

const d = new Date();

const year = d.getFullYear();
const month = d.getMonth() + 1;
const date = d.getDate();
const hour = d.getHours();
const minute = d.getMinutes();

const nowTime = `${year}年${month}月${date}日 ${hour}:${minute}`;

// valtio
export const state = proxy<{ arr: { a: string; b: string }[] }>({
  arr: [
    { a: "test1", b: nowTime },
    { a: "test2", b: nowTime },
  ],
});

// コンポーネントの外部で記述、破壊的メソッドを使える
const deleteText = (i: number) => {
  state.arr.splice(i, 1);
};

const addText = (text: string) => {
  state.arr.push({ a: text, b: nowTime });
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
    <>
      <div className="py-24 mx-auto w-9/12">
        {arr.map((value, i) => {
          return (
            <Chat
              key={i}
              arr={value}
              i={i}
              delete={deleteText}
            />
          );
        })}
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register("text")}
            className="block py-2 px-1 my-5 mx-auto w-9/12 bg-white bg-opacity-10 border border-black"
          />
          <button onSubmit={handleSubmit(onSubmit)}>送信</button>
        </form>
      </div>
    </>
  );
};
