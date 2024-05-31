import { ButtonHTMLAttributes, ReactNode } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: ReactNode;
  classname?: string;
}
const Button = ({ onClick, children, classname, ...props }: ButtonProps) => {
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
