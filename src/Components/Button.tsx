import { ButtonHTMLAttributes, ReactNode } from "react";

const Button = ({
  onClick,
  children,
  classname,
  ...props
}: {
  onClick: () => void;
  children: ReactNode;
  classname?: string;
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}) => {
  return (
    <button
      {...props}
      className={`bg-slate-800 hover:bg-slate-700 rounded-md outline-none border-none cursor-pointer px-4 py-2 ${classname}`}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
