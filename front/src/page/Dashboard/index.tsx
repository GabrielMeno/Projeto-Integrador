import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/auth";
import style from "./Dashboard.module.css";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ptBR } from "date-fns/locale";
import { format, isToday } from "date-fns";
import { api } from "../../server";

interface IShedule {
  name: string;
  date: Date;
  phone: string;
  id: string;
}

export function Dashboard() {
  const [date, setDate] = useState(new Date());
  const { user } = useAuth();

  const [schedules, setSchedules] = useState<Array<IShedule>>([]);

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 7;
  };

  const isWeeDay = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 7;
  };

  const handleDataChange = (date: Date) => {
    setDate(date);
  };

  useEffect(() => {
    api
      .get("/schedules", {
        params: {
          date,
        },
      })
      .then((response) => {
        console.log(
          "🚀 ~ file: index.tsx:36 ~ useEffect ~ response:",
          response
        );
        setSchedules(response.data);
      })
      .catch((error) => console.log(error));
  }, [date]);

  return (
    <div className="container">
      <Header />
      <div className={style.dataTitle}>
        <h2>Bem Vindo(a) {user.name}</h2>
        <p>
          {" "}
          Está é a sua lista de horários para{" "}
          {isToday(date) && <span>de hoje, </span>} dia{" "}
          {format(date, "dd/MM/yyy")}
        </p>
      </div>
      <h2 className={style.nextSchedules}>Próximos Horários </h2>
      <div className={style.schedule}>
        <div className={style.cardWrapper}>
          {schedules.map((schedule, index) => {
            return (
              <Card
                key={index}
                date={schedule.date}
                name={schedule.name}
                id={schedule.id}
                phone={schedule.phone}
              />
            );
          })}
        </div>
        <div className={style.picker}>
          <DayPicker
            className={style.calendar}
            classNames={{
              day: style.day,
            }}
            selected={date}
            modifiers={{ available: isWeeDay }}
            mode="single"
            modifiersClassNames={{
              selected: style.selected,
            }}
            fromMonth={new Date()}
            locale={ptBR}
            disabled={isWeekend}
            onDayClick={handleDataChange}
          />
        </div>
      </div>
    </div>
  );
}
