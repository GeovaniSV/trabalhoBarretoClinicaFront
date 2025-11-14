import React, { type ButtonHTMLAttributes } from "react";

type ButtonProps = {
  title: string;
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function ButtonField({ title, className, type, ref, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      ref={ref}
      type={type ? type : "button"}
      className={`${className} w-full p-2 bg-blue-500 rounded-md text-white font-bold hover:bg-blue-400 cursor-pointer`}
    >
      {title}
    </button>
  );
}

export default ButtonField;
