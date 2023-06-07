import axios from 'axios';
import {Journal } from '../../Models/Crud3';

const BASE_URL = 'http://localhost:8000'; // Update with your Django server URL

export const getAllJournals = async (): Promise<Journal[]> => {
  const response = await axios.get<Journal[]>(`${BASE_URL}/journal/`);
  return response.data;
};

export const addJournal = async (journal: Journal): Promise<Journal> => {
  const response = await axios.post<Journal>(`${BASE_URL}/journal/`, journal);
  return response.data;
};

export const updateJournal = async (id: number, journal: Journal): Promise<Journal> => {
  const response = await axios.put<Journal>(`${BASE_URL}/journal/${id}/`, journal);
  return response.data;
};

export const deleteJournal = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/journal/${id}/`);
};
