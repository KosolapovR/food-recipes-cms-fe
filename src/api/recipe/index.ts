import axios from 'axios';
import { baseUrl } from '../const';

export async function fetchRecipes() {
  const { data } = await axios.get(`${baseUrl}/recipe`);
  return data;
}

export async function fetchRecipeById(id: string) {
  const { data } = await axios.get(`${baseUrl}/recipe/${id}`);
  return data;
}
