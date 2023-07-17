import style from "./Card.module.css";
import { RiDeleteBinLine } from "react-icons/ri";

import { AiOutlineEdit } from "react-icons/ai";
export const Card = () => {
  return (
    <div  className={style.background}>
      
      <div>
        <span>10h</span>
        <p>Gabriel Menoncin</p>
      </div>
      <div className={style.icons}>
        <AiOutlineEdit color="#5F68B1" size={17}/>
        <RiDeleteBinLine  color= "#EB2E2E" size={17}/>  
      </div>
    </div>
  )
}