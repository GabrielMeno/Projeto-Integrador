import axios, { Axios, AxiosError } from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token: projeto-integrador");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response, 
  async (error: AxiosError | unknown) => {

    const originalRequest = (error as AxiosError).config;

    if(error instanceof AxiosError && error.response?.status === 401) {
      if(
        error.response?.data && 
        error.response?.data.code === 'token.expired'
      ) {
        const refresh = localStorage.getItem(
          'refresh_token: projeto-integrador',
          );
        const response = await api.post('/refresh', {
          refresh_token: refresh
        });

        const { token, refresh_token } = response.data;
        localStorage.setItem('token: projeto-integrador', token);
        localStorage.setItem('refresh_token: projeto-integrador', refresh_token);

        if(originalRequest?.headers)
          originalRequest.headers.Authorization = `Bearer ${token}`;
      }
    }
  }
);
        
export { api };
 