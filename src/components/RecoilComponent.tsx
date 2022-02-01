import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Chat } from "src/components/chat";
import { addText } from "src/hooks/addText";
import { proxy, useSnapshot } from "valtio";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { deleteText } from "src/hooks/deleteText";

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
      <div className="w-9/12 py-24 mx-auto">
        {text.map((value, i) => {
          return <Chat key={i} text={value} i={i} delete={deleteText} />;
        })}
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register("text")}
            className="block border border-black py-2 px-1 my-5 mx-auto w-9/12 bg-white bg-opacity-10"
          />
          <button onSubmit={handleSubmit(onSubmit)}>送信</button>
        </form>
        {count}
      </div>
    </>
  );
};
