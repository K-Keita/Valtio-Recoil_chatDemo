type Props = {
  i: number;
  items: {value: string, createdAt: string};
  delete: (i: number) => void;
};

export const Chat = (props: Props) => {
  return (
    <div className="group relative py-4 mx-auto w-full border-b animate-fade-in">
      <p className="text-sm text-right text-gray-500">{props.items.createdAt}</p>
      <div className="flex">
        <p className="mx-3 text-3xl font-bold">{props.i + 1}</p>
        <p className="my-2 w-9/12">{props.items.value}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="hidden group-hover:block p-1 my-1 ml-auto w-8 h-8 hover:bg-gray-100 rounded-md border cursor-pointer"
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
