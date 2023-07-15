import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

interface IRequestConfig extends AxiosRequestConfig {
  onFailure?: (error: AxiosError) => void;
  onSuccess?: (response: AxiosResponse) => void;
}



const api = axios.create({
  baseURL: "http://localhost:3333",
});


const refreshSubscribers: Array<(token: string) => void >= [];

let failedRequest: Array <IRequestConfig> = [];


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

    const originalRequest = (error as AxiosError).config as IRequestConfig;

    if(error instanceof AxiosError && error.response?.status === 401) {
      if(
        error.response?.data && 
        error.response?.data.code === 'token.expired'
      ) {

        try {
          const refresh = localStorage.getItem(
            'refresh_token: projeto-integrador',
            );
          const response = await api.post('/refresh', {
            refresh_token: refresh
          });
  
          const { token, refresh_token } = response.data;
          localStorage.setItem('token: projeto-integrador', token);
          localStorage.setItem('refresh_token: projeto-integrador', refresh_token);
  
          onRefreshed(token);
  
  
          if(originalRequest?.headers){
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return axios(originalRequest);
        } catch (error) {
          failedRequest.forEach((request) =>  {
            request.onFailure?.(error as AxiosError)
          });
          failedRequest = []; 
        }
      }
    }else{
      localStorage.remodeItem('token: projeto-integrador');
      localStorage.remodeItem('refesh_token: projeto-integrador');
      localStorage.remodeItem('user: projeto-integrador');
    }

    return Promise.reject(error);
  },
);


function onRefreshed(token: string){
  refreshSubscribers.forEach((callback) => callback(token));
}
        
export { api };
 