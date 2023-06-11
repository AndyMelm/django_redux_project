import axios from 'axios';

export function getAll() {
  return axios.get('http://127.0.0.1:8000/journal/').then((res) => res.data);
}

export function createEntry(entry: any) {
  return axios.post('http://127.0.0.1:8000/journal/', entry).then((res) => res.data);
}

export function updateEntry(entry: any) {
  const url = `http://127.0.0.1:8000/journal/${entry.id}/`;
  return axios.put(url, entry.formData).then((res) => res.data);
}

export function deleteEntry(entryId: number) {
  const url = `http://127.0.0.1:8000/journal/${entryId}/`;
  return axios.delete(url);
}
