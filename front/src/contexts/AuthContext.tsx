import { ReactNode, createContext, useEffect, useState } from "react";
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
  user: IUserData;
  availableSchedules: Array<string>;
  schedules: Array<IShedule>;
  date: string;
  handleSetDate: (date: string) => void;
  isAuthenticated: boolean;   
}

interface IShedule {
  name: string;
  date: Date;
  phone: string;
  id: string;
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
  const [schedules, setSchedules] = useState<Array<IShedule>>([]);
  const [date, setDate] = useState("");
  const availableSchedules = [
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
  ];
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user: projeto-integrador");
    if (user) {
      return JSON.parse(user);
    }
    return {};
  });

  const isAuthenticated = !!user && Object.keys(user).length !== 0;




  const navigate = useNavigate();

  const handleSetDate = (date: string) => {
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
        console.log("🚀 useEffect", response);
        setSchedules(response.data);
      })
      .catch((error) => console.log(error));
  }, [date]);

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
      toast.success(`Seja bem vindo(a) ${userData.name}`);
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
    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user,
        availableSchedules,
        schedules,
        date,
        handleSetDate,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
