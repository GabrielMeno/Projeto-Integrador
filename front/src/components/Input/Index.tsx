import { ForwardRefRenderFunction, forwardRef } from "react";
import style from "./Input.module.css";
import { AiOutlineMail } from "react-icons/ai";

interface IInput {
  placeholder: string;
  type: 'password' | 'text'| 'date';
  error?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInput> = (
  { placeholder,type,error, ...rest },
  ref,
) => {
  return (
    <div className={style.container}>
      <label htmlFor="">
        <i aria-hidden="true">
          <AiOutlineMail size={20} />
        </i>
        <input type={type} placeholder={placeholder} ref={ref} {...rest}/>
      </label>
      {error && <span>{error}</span>}
    </div>
  );
};

export const Input = forwardRef(InputBase);
