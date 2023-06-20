import axios, { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
}

export function register(user: any) {
  return new Promise<{ data: any }>((resolve, reject) => {
    axios
      .post("http://127.0.0.1:8000/register/", user)
      .then(res => resolve({ data: res.data }))
      .catch((error: AxiosError) => {
        if (error.response && error.response.status === 400) {
          const errorMessage = (error.response.data as ErrorResponse).message;
          reject(new Error(errorMessage));
        } else {
          reject(error);
        }
      });
  });
}
