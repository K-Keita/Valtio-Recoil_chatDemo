import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Chat } from "src/components/chat";
import { addText } from "src/hooks/addText";
import { deleteText } from "src/hooks/deleteText";
import { proxy, useSnapshot } from "valtio";

// valtio
export const state = proxy<{ arr: string[] }>({
  arr: ["test1", "test2"],
});

type FormValues = {
  text: string;
};

export const ValtioComponent = (): JSX.Element => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const { arr } = useSnapshot(state);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.text === "") {
      return false;
    }
    addText(data.text);
    reset();
  };

  return (
    <>
      <p className="text-2xl">valtio</p>
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
      </div>
    </>
  );
};
