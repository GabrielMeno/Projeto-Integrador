import style from "./Card.module.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
export const Card = () => {
  return (
    <div  className={style.background}>
      
      <div>
        <span>10h</span>
        <p>Gabriel Menoncin</p>
      </div>
      <div className={style.icons}>
        <RiDeleteBinLine color="#5F68B1/>
        <GrEdit />
      </div>
    </div>
  )
}