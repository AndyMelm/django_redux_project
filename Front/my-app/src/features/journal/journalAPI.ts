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
  const formData = new FormData();

  // Append updated fields to the FormData object
  for (const field in updatedFields) {
    formData.append(field, updatedFields[field]);
  }

  return axios.put(url, formData, {
    headers: {
      Authorization: getToken(),
      'Content-Type': 'multipart/form-data', // Set the correct content type for FormData
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
