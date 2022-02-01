import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { Chat } from "src/components/chat";

type FormValues = {
  text: string;
};

//recoil
export const textState = atom({
  key: "textState",
  default: ["test1", "test2"],
});

export const charCountState = selector({
  key: "charCountState",
  // Atomで管理していた文字列を加工して文字数として返却する
  get: ({ get }) => {
    // get()でAtomから値を取得する
    const text = get(textState);

    // 加工した値を返却
    return text.length;
  },
});

export const RecoilComponent = (): JSX.Element => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  // const [状態変数, 状態を変更するための関数] = useRecoilState(atomのkey);
  const [text, setText] = useRecoilState(textState);

  const deleteText = (i: number) => {
    const a = [...text];

    a.splice(i, 1);

    setText(a);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.text === "") {
      return false;
    }
    const newArr = [...text, data.text];
    reset();
    setText(newArr);
  };

  const count = useRecoilValue(charCountState);

  return (
    <>
      <p className="text-2xl">recoil</p>
      <div className="py-24 mx-auto w-9/12">
        {text.map((value, i) => {
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
