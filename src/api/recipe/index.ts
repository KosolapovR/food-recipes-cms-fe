import axios from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';

import { baseUrl } from '../const';
import { IRecipe, IRecipeStep } from '../../interfaces';
import { RecipeStatusType } from '../../interfaces/IRecipe';

export async function fetchRecipes({ queryKey }: QueryFunctionContext) {
  const [_key, status] = queryKey;
  const { data } = await axios.get(
    `${baseUrl}/recipe${status ? `?status=${status}` : ''}`
  );
  const res: IRecipe[] = data.data;
  return res;
}

export async function fetchRecipeById({ queryKey }: QueryFunctionContext) {
  const [_key, params] = queryKey;
  const { id } = params as { id: string };
  const { data } = await axios.get(`${baseUrl}/recipe/${id}`);
  const res: IRecipe = data.data;
  return res;
}

export async function removeRecipeById(body: { id: string }) {
  const { status } = await axios.post(`${baseUrl}/recipe/Delete`, body);
  return status;
}

export interface ICreateRecipeBodyParams {
  title: string;
  steps: IRecipeStep[];
  previewImagePath: string;
}
export interface IUpdateRecipeBodyParams extends ICreateRecipeBodyParams {
  id: number;
  status: RecipeStatusType;
}

export async function createRecipe(body: ICreateRecipeBodyParams) {
  const { data } = await axios.post(`${baseUrl}/recipe/Create`, body);
  const res: IRecipe = data.data;
  return res;
}

export async function updateRecipe(body: IUpdateRecipeBodyParams) {
  const { data } = await axios.put(`${baseUrl}/recipe/Update`, body);
  const res: IRecipe = data.data;
  return res;
}

export async function activateRecipe(body: { id: string }) {
  const { data } = await axios.post(`${baseUrl}/recipe/Activate`, body);
  const res: IRecipe = data.data;
  return res;
}
export async function deactivateRecipe(body: { id: string }) {
  const { data } = await axios.post(`${baseUrl}/recipe/Deactivate`, body);
  const res: IRecipe = data.data;
  return res;
}
