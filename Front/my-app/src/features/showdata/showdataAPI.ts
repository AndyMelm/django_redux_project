import axios from 'axios';
import { Journal } from '../../Models/Journal';

export function getAlldata() {
  return axios.get<Journal[]>('http://127.0.0.1:8000/journal/').then((res) => res.data);
}


