import axios, { AxiosError } from 'axios';

export function login(user: any) {
  return new Promise<{ data: any }>((resolve, reject) => {
    axios
      .post("http://127.0.0.1:8000/login/", user)
      .then(res => resolve({ data: res.data }))
      .catch((error: AxiosError) => {
        if (error.response && (error.response.status === 401 || error.response.status === 400)) {
          reject(new Error('Incorrect username or password'));
        } else {
          reject(error);
        }
      });
  });
}
