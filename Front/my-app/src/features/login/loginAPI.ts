import axios from 'axios';

export async function login(user1: any) {
  try {
    const response = await axios.post("http://127.0.0.1:8000/login/", user1);
    return { data: response.data };
  } catch (error: any) {
    if (error.response && (error.response.status === 401 || error.response.status === 400)) {
      throw new Error('Incorrect username or password');
    } else {
      throw error;
    }
  }
}

export async function getUserId(token: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get('http://127.0.0.1:8000/get_user_id/', config);
    const userId = response.data.user_id;
    console.log("login api", userId);
    return userId;
  } catch (error: any) {
    throw error;
  }
}
