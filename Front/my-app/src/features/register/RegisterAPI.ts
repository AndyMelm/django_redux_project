import axios, { AxiosError } from 'axios';

export function register(user: any) {
  return new Promise<{ data: any }>((resolve, reject) => {
    axios
      .post("http://127.0.0.1:8000/register/", user)
      .then(res => resolve({ data: res.data }))
      .catch((error: AxiosError) => {
        if (error.response && error.response.status === 400) {
          reject(new Error('Username is already taken. Please choose a different username.'));
        } else {
          reject(error);
        }
      });
  });
}
