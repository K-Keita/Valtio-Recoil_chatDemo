import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Chat } from "src/components/chat";
import { addText } from "src/hooks/addText";
import { proxy, useSnapshot } from "valtio";
import { atom, RecoilRoot, useRecoilState } from "recoil";

type Key = {
  key: string;
  default: string;
};

//recoil
export const textState = atom({
  key: "textState",
  default: ["test1", "test2"],
});

// valtio
export const state = proxy<{ arr: string[] }>({
  arr: ["test1", "test2"],
});

type FormValues = {
  text: string;
  text2: string;
};

const Home: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  // const [状態変数, 状態を変更するための関数] = useRecoilState(atomのkey);
  const [text, setText] = useRecoilState(textState);

  const { arr } = useSnapshot(state);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.text === "") {
      return false;
    }
    addText(data.text);
    reset();
  };

  const onSubmit2: SubmitHandler<FormValues> = (data) => {
    if (data.text2 === "") {
      return false;
    }
    const newArr = [...text, data.text2];
    setText(newArr);

    reset();
  };

  return (
    <div>
      <div className="w-9/12 py-24 mx-auto">
        {arr.map((value, i) => {
          return <Chat key={i} text={value} i={i} />;
        })}
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register("text")}
            className="block border border-black py-2 px-1 my-5 mx-auto w-9/12 bg-white bg-opacity-10"
          />
          <button onSubmit={handleSubmit(onSubmit)}>送信</button>
        </form>
      </div>

      <div className="w-9/12 py-24 mx-auto">
        {text.map((value, i) => {
          return <Chat key={i} text={value} i={i} />;
        })}
        <form onSubmit={handleSubmit(onSubmit2)}>
          <textarea
            {...register("text2")}
            className="block border border-black py-2 px-1 my-5 mx-auto w-9/12 bg-white bg-opacity-10"
          />
          <button onSubmit={handleSubmit(onSubmit2)}>送信</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
