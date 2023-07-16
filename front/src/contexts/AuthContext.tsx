import { ReactNode, createContext, useState } from "react";
import { api } from "../server";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IAuthProvider {
  children: ReactNode;
}
interface IAuthContextData {
  signIn: ({ email, password }: ISingIn) => void;
  signOut: () => void;
  user: IUserData
}

interface IUserData {
  name: string;
  email: string;
  avatar_url: string;
}

interface ISingIn {
  email: string;
  password: string;
}

export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({ children }: IAuthProvider) {
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user: projeto-integrador");
    if (user) {
      return JSON.parse(user);
    }
    return {};
  });

  const navigate = useNavigate();
  async function signIn({ email, password }: ISingIn) {
    try {
      const { data } = await api.post("/users/auth", {
        email,
        password,
      });
      console.log("🚀 ~ file: AuthContext.tsx:27 ~ signIn ~ data:", data);
      const { token, refresh_token, user } = data;
      const userData = {
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
      };
      localStorage.setItem("token: projeto-integrador", token);
      localStorage.setItem("refresh_token: projeto-integrador", refresh_token);
      localStorage.setItem(
        "user: projeto-integrador",
        JSON.stringify(userData)
      );
 
      navigate("/dashboard"); 
      toast.success(`Seja bem vindo(a) ${userData.name}`) 
      setUser(userData);
      return data;
    } catch (error) {
      console.log("🚀 ~ file: AuthContext.tsx:16 ~ signIn ~ error:", error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error(
          "Não foi possível fazer o login. Tente novamente mais tarde."
        );
      }
    }
  }

  function signOut() {
    localStorage.removeItem("token: projeto-integrador");
    localStorage.removeItem("refresh_token: projeto-integrador");
    localStorage.removeItem("user: projeto-integrador");
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, user }}>{children}</AuthContext.Provider>
  );
}
