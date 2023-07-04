import style from "./Register.module.css";
import logo from "../../assets/logo.png";
import { Input } from "../../components/Input/Index";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsPerson, BsKey } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { api } from "../../server";

interface IFormValues {
  name: string;
  email: string;
  password: string;
}

export function Register() {
  const schema = yup.object().shape({
    name: yup.string().required("Campo de nome obrigatório"),
    email: yup
      .string()
      .email("Digite um email válido")
      .required("Campo de email obrigatório"),
    password: yup
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .required("Campo de senha obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({ resolver: yupResolver(schema) });

  const submit = handleSubmit(async(data) => {
    const result = await api.post('/users', {
      name: data.name,
      email: data.email,
      password: data.password
    });
    console.log(result);
  });

  return (
    <div className={style.background}>
      <div className="container">
        <p className={style.navigate}>
          <Link to={"/"}>home</Link> {">"} Área de Cadastro
        </p>
        <div className={style.wrapper}>
          <div className={style.imageContainer}>
            <img src={logo} alt="" />
          </div>
          <div className={style.card}>
            <h2>Área de Cadastro</h2>
            <form onSubmit={submit}>
            <Input
                type="text"
                placeholder="Nome"
                {...register("name", { required: true })}
                error={errors.name && errors.name.message}
                icon={<BsPerson size={20} />}
              />
              <Input
                type="text"
                placeholder="Email"
                {...register("email", { required: true })}
                error={errors.email && errors.email.message}
                icon={<AiOutlineMail size={20} />}
              />
              <Input
                placeholder="Senha"
                type="password"
                {...register("password", { required: true })}
                error={errors.password && errors.password.message}
                icon={< BsKey  size={20} />}
              />
              <Button text="Cadastrar" />
            </form>
            <div className={style.register}>
              <span>
                Já tem cadastro? <Link to={"/"}>Voltar à Página Inicial</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
