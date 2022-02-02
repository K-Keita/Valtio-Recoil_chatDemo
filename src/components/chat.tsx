type Props = {
  arr: {a: string, b: string};
  i: number;
  delete: (i: number) => void;
};

export const Chat = (props: Props) => {
  return (
    <div className="group relative py-4 mx-auto w-9/12 border-t animate-fade-in">
      <p className="text-right text-sm text-gray-500">{props.arr.b}</p>
      <div className="flex">
        <p className="text-3xl font-bold mx-3">{props.i + 1}</p>
        <p className="my-2 w-9/12">{props.arr.a}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="p-1 my-1 hidden group-hover:block ml-auto w-8 h-8 hover:bg-gray-100 cursor-pointer border rounded-md"
          onClick={() => {
            return props.delete(props.i);
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>
    </div>
  );
};
