import style from './Register.module.css';
import logo from '../../assets/logo.png';
import { Input } from '../../components/Input/Index';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';



export function Register() {
  return (
    <div className={style.background}>
      <div className="container">
        <p className={style.navigate}><Link to={'/'}>home</Link>  {'>'} Área de Cadastro</p>
        <div className={style.wrapper}>
        <div className={style.imageContainer}>
            <img src={logo} alt="" />
        </div>
          <div className={style.card}>
            <h2>Área de Cadastro</h2>
            <form>
              <Input
                type="text"
                placeholder="Email"
               // {...register("email", { required: true })}
               // error={errors.email && errors.email.message}
              />
              <Input
                placeholder="Senha"
                type="password"
               // {...register("password", { required: true })}
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
