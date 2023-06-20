import axios from 'axios';

const getToken = () => {
  const token = sessionStorage.getItem('token');
  return token ? `Bearer ${token}` : '';
};

export function getAll(userId: number) {
  const url = `http://127.0.0.1:8000/journal/${userId}/`;
  return axios.get(url, {
    headers: {
      Authorization: getToken(),
    },
  }).then((res) => res.data);
}

export function createEntry(entry: any) {
  return axios.post('http://127.0.0.1:8000/journal/', entry, {
    headers: {
      Authorization: getToken(),
    },
  }).then((res) => res.data);
}

export function updateEntry(id: number, updatedFields: any) {
  const url = `http://127.0.0.1:8000/journal/${id}/`;
  return axios.put(url, updatedFields, {
    headers: {
      Authorization: getToken(),
    },
  }).then((res) => res.data);
}

export function deleteEntry(entryId: number) {
  const url = `http://127.0.0.1:8000/journal/${entryId}/`;
  return axios.delete(url, {
    headers: {
      Authorization: getToken(),
    },
  });
}
