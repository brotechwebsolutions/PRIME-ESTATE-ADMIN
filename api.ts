
import axios from 'axios';
import { Flat, CreateFlatDTO } from './types';

const API_BASE_URL = "https://prime-estates-api.onrender.com/api/flats";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getFlats = async (): Promise<Flat[]> => {
  const response = await apiClient.get<Flat[]>('');
  return response.data;
};

export const createFlat = async (flat: CreateFlatDTO): Promise<Flat> => {
  const response = await apiClient.post<Flat>('', flat);
  return response.data;
};

export const updateFlat = async (id: string, flat: Partial<Flat>): Promise<Flat> => {
  const response = await apiClient.put<Flat>(`/${id}`, flat);
  return response.data;
};

export const deleteFlat = async (id: string): Promise<void> => {
  await apiClient.delete(`/${id}`);
};
