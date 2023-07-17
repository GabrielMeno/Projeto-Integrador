import style from "./Card.module.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { getHours, isAfter } from "date-fns";

interface ISchedule {
  name: string;
  date: Date;
  phone: string;
  id: string;
}

export const Card = ({ name, date, id, phone }: ISchedule) => {
  const isAfterDate = isAfter(new Date(date), new Date());

  let phoneFormated = phone.replace(/\D/g, "");
  phoneFormated = phoneFormated.replace(
    /(\d{2})(\d{4})(\d{4})/,
    "($1)  $2-$3"
  );

  console.log("🚀 ~ file: index.tsx:16 ~ Card ~ isAfterDate:", isAfterDate);
  return (
    <div className={style.background}>
      <div>
        <span className={`${!isAfterDate && style.disabled}`}>
          {getHours(new Date(date))}h
        </span>
        <p>
          {name} - {phoneFormated}
        </p>
      </div>
      <div className={style.icons}>
        <AiOutlineEdit color="#5F68B1" size={17} />
        <RiDeleteBinLine color="#EB2E2E" size={17} />
      </div>
    </div>
  );
};
