import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input: React.FC<InputProps> = (props) => {
  const className = props.className + " border border-zinc-600 p-2 rounded";

  return <input type="text" {...props} className={className} />;
};
