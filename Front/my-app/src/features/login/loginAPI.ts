import axios, { AxiosError } from 'axios';

export function login(user1: any) {
  return new Promise<{ data: any }>((resolve, reject) => {
    axios
      .post("http://127.0.0.1:8000/login/", user1)
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

export function getUserId(token: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return new Promise<number>((resolve, reject) => {
    axios
      .get('http://127.0.0.1:8000/get_user_id/', config)
      .then((response) => {
        const userId = response.data.user_id;
        console.log("login api", userId)
        resolve(userId);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
}