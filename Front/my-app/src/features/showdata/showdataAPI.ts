import axios from 'axios';
import { Journal } from '../../Models/Journal';

export async function getAlldata(userId: number): Promise<Journal[]> {
  const url = `http://127.0.0.1:8000/journal/${userId}/`;
  const token = sessionStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.get<Journal[]>(url, { headers });
  return response.data;
}
