import type { Dispatch, SetStateAction } from "react";
import "./EmptyScreenText.css";

interface EmptyScreenProps {
  openModal: Dispatch<SetStateAction<boolean>>;
}

function EmptyScreenText({ openModal }: EmptyScreenProps) {
  return (
    <main className="h-full max-lg:h-[70vh]  flex justify-center items-center border-b">
      <div className="w-full flex counter-terrorist h-full justify-center max-sm:hidden"></div>
      <div className="flex flex-col gap-2 h-28 p-2 w-full max-sm:items-center">
        <span className="font-bold ">
          Parece que não há nada por aqui. <br /> Que tal criar um novo card?
        </span>
        <button
          onClick={() => openModal(true)}
          className="w-64 font-bold p-2 border rounded-4xl shadow-xl border-gray-400 cursor-pointer hover:bg-gray-100"
        >
          Criar card
        </button>
      </div>
    </main>
  );
}

export default EmptyScreenText;
