import style from "./Input.module.css";
import { AiOutlineMail } from "react-icons/ai";

export const Input = () => {
  return (
    <div className={style.container}>
      <label htmlFor="">
        <i aria-hidden="true">
          <AiOutlineMail size={20}/>
        </i>
        <input type="text" placeholder="Email" />
      </label>
    </div>
  );
};
