import axios from 'axios';
import { baseUrl } from '../const';
import { QueryFunctionContext } from '@tanstack/react-query';

export async function fetchRecipes({ queryKey }: QueryFunctionContext) {
  const [_key, status] = queryKey;
  const { data } = await axios.get(
    `${baseUrl}/recipe${status && status !== 'All' ? `?status=${status}` : ''}`
  );
  return data.data;
}

export async function fetchRecipeById(id: string) {
  const { data } = await axios.get(`${baseUrl}/recipe/${id}`);
  return data.data;
}

export async function removeById(id: string) {
  const { status } = await axios.post(`${baseUrl}/recipe/Delete`, { id });
  return status;
}
