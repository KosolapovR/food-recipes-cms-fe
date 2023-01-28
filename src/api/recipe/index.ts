import axios from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';

import { baseUrl } from '../const';
import {
  IRecipeCreateDTO,
  IRecipeGroupDTO,
  IRecipeSingleDTO,
  IRecipeUpdateDTO,
  CommonSingleActionBodyType,
} from '../../interfaces';

export async function fetchRecipes({ queryKey }: QueryFunctionContext) {
  const [_key, status] = queryKey;
  const { data } = await axios.get(
    `${baseUrl}/recipe${status ? `?status=${status}` : ''}`
  );
  const res: IRecipeGroupDTO[] = data.data;
  return res;
}

export async function fetchRecipeById({ queryKey }: QueryFunctionContext) {
  const [_key, params] = queryKey;
  const { id } = params as { id: string };
  const { data } = await axios.get(`${baseUrl}/recipe/${id}`);
  const res: IRecipeSingleDTO = data.data;
  return res;
}

export async function removeRecipeById(body: CommonSingleActionBodyType) {
  const { status } = await axios.post(`${baseUrl}/recipe/Delete`, body);
  return status;
}

export async function createRecipe(body: IRecipeCreateDTO) {
  const { data } = await axios.post(`${baseUrl}/recipe/Create`, body);
  const res: IRecipeSingleDTO = data.data;
  return res;
}

export async function updateRecipe(body: IRecipeUpdateDTO) {
  const { data } = await axios.put(`${baseUrl}/recipe/Update`, body);
  const res: IRecipeSingleDTO = data.data;
  return res;
}

export async function activateRecipe(body: CommonSingleActionBodyType) {
  const { data } = await axios.post(`${baseUrl}/recipe/Activate`, body);
  const res: IRecipeSingleDTO = data.data;
  return res;
}
export async function deactivateRecipe(body: CommonSingleActionBodyType) {
  const { data } = await axios.post(`${baseUrl}/recipe/Deactivate`, body);
  const res: IRecipeSingleDTO = data.data;
  return res;
}
