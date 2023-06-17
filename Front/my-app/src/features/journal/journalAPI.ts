import axios from 'axios';

export function getAll() {
  return axios.get('http://127.0.0.1:8000/journal/').then((res) => res.data);
}

export function createEntry(entry: any) {
  return axios.post('http://127.0.0.1:8000/journal/', entry).then((res) => res.data);
}


export function updateEntry(id: number, updatedFields: any) {
  const url = `http://127.0.0.1:8000/journal/${id}/`;
  return axios.put(url, updatedFields).then((res) => res.data);
}




export function deleteEntry(entryId: number) {
  const url = `http://127.0.0.1:8000/journal/${entryId}/`;
  return axios.delete(url);
}
