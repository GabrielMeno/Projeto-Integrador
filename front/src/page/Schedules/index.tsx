import { Header } from "../../components/Header";
import { InputSchedule } from "../../components/InputSchedule";
import { useAuth } from "../../hooks/auth";
import style from "./Schedules.module.css";
import { useForm } from "react-hook-form";
import { getHours } from "date-fns";
import { isAxiosError } from "axios";
import { formatISO, parseISO, setHours } from "date-fns";
import { toast } from "react-toastify";
import { api } from "../../server";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
interface IFormValues {
  name: string;
  phone: string;
  date: string;
  hour: string;
}
export function Schedules() {
  const schema = yup.object().shape({
    phone: yup.string().required("Telefone obrigatório"),
    name: yup.string().required("Nome obrigatório"),
    date: yup.string().required("Data obrigatória"),
    hour: yup.string().required("Hora obrigatória"),
  });

  const { register, handleSubmit , formState: {errors}} = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });
  const { availableSchedules, schedules, handleSetDate } = useAuth();
  const Navigate = useNavigate();
  const currentValue = new Date().toISOString().split("T")[0];
  const filteredDate = availableSchedules.filter((hour) => {
    const isScheduleAvailable = !schedules.find((scheduleItem) => {
      const scheduleDate = new Date(scheduleItem.date);
      const scheduleHour = getHours(scheduleDate);
      return scheduleHour === Number(hour);
    });
    return isScheduleAvailable;
  });
  const submit = handleSubmit(async ({ date, name, phone, hour }) => {
    const formatedDate = formatISO(setHours(parseISO(date), parseInt(hour)));
    console.log(
      "🚀 ~ file: index.tsx:31 ~ submit ~ formatedDate:",
      formatedDate
    );
    try {
      await api.post(`/schedules/`, {
        name,
        phone,
        date: formatedDate,
      });
      toast.success("Agendamento atualizado com sucesso!");
      Navigate("/dashboard");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  });
  return (
    <div className={`${style.container} container`}>
      <Header />
      <h2>Agendamento de Horário</h2>
      <div className={style.formDiv}>
        <form onSubmit={submit}>
          <InputSchedule
            placeholder="Nome do Cliente"
            type="text"
            {...register("name", { required: true })}
            error={errors.name && errors.name.message}
          />
          <InputSchedule
            placeholder="Celular"
            type="text"
            {...register("phone", { required: true })}
            error={errors.phone && errors.phone.message}
          />

          <div className={style.date}>
            <InputSchedule
              placeholder="Dia"
              type="date"
              {...register("date", {
                required: true,
                value: currentValue,
                onChange: (e) => handleSetDate(e.target.value),
              })}
              error={errors.date && errors.date.message}
            />
            <div className={style.select}>
              <label htmlFor="">Horário</label>
              <select
                {...register("hour", {
                  required: true,
                })}
                
              >
                {filteredDate.map((hour, index) => {
                  return (
                    <option value={hour} key={index}>
                      {hour}:00
                    </option>
                  );
                })}
              </select>
              {errors.hour && <span>{errors.hour.message}</span>}
            </div>
          </div>

          <div className={style.footer}>
            <button>Cancelar</button>
            <button>Editar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
