import style from "./Card.module.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { getHours, isAfter } from "date-fns";
import { useState } from "react";
import { ModalEdit } from "../ModalEdit";
import { get } from "react-hook-form";

interface ISchedule {
  name: string;
  date: Date;
  phone: string;
  id: string;
}

export const Card = ({ name, date, id, phone }: ISchedule) => {
  const isAfterDate = isAfter(new Date(date), new Date());
  const [openModal, setOpenModal] = useState<boolean>(false);

  const dateFormated = new Date(date);
  const hour = getHours(dateFormated);




  let phoneFormated = phone.replace(/\D/g, "");
  phoneFormated = phoneFormated.replace(/(\d{2})(\d{4})(\d{4})/, "($1)  $2-$3");

  const handleChangeModal = () => {
    setOpenModal(!openModal);
  }

  
  return (
    <>
      <div className={style.background}>
        <div>
          <span className={`${!isAfterDate && style.disabled}`}>
            {hour}h
          </span>
          <p>
            {name} - {phoneFormated}
          </p>
        </div>
        <div className={style.icons}>
          <AiOutlineEdit
            color="#5F68B1"
            size={17}
            onClick={() => isAfterDate && handleChangeModal()}
          />
          <RiDeleteBinLine color="#EB2E2E" size={17} />
        </div>
      </div>
      <ModalEdit isOpen={openModal} handleChangeModal={handleChangeModal} hour={hour} name={name} />
    </>
  );
};
