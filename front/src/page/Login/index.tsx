import style from "./Login.module.css";
import logo from "../../assets/logo.png";
import { Input } from "../../components/Input/Index";

export function Login() {
  return (
    <div className={style.background}>
      <div className={`container ${style.container}`}>
        <div className={style.wrapper}>
          <div>
            <img src={logo} alt="" />
          </div>
          <div className={style.card}>
            <h2>Olá, Seja bem vindo</h2>
            <form>
              <Input/>
              <input type="text" />
              <button>Entrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
