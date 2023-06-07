import axios from 'axios';
import { Journal } from '../../Models/Journal';

export function getAll() {
  return axios.get<Journal[]>('http://127.0.0.1:8000/journal/').then((res) => res.data);
}

export function createEntry(entry: Journal) {
  console.log(entry)
  return axios.post<Journal>('http://127.0.0.1:8000/journal/', entry).then((res) => res.data);
}

// export function createEntry(entry: Journal) {
//   console.log("add API");
//   return new Promise<{ data: any }>((resolve) =>
//       axios.post("http://127.0.0.1:8000/journal/",entry).then(res => resolve({ data: res.data }))
//   );
// }

export function updateEntry(entry: Journal) {
  const url = `http://127.0.0.1:8000/journal/${entry.id}/`;
  return axios.put<Journal>(url, entry).then((res) => res.data);
}

export function deleteEntry(entryId: number) {
  const url = `http://127.0.0.1:8000/journal/${entryId}/`;
  return axios.delete(url);
}
