import { QueryFunctionContext } from '@tanstack/react-query';

import axios from '../axios-instance';
import {
  IRecipeCreateDTO,
  IRecipeGroupDTO,
  IRecipeSingleDTO,
  IRecipeUpdateDTO,
  CommonSingleActionBodyType,
  ApiResponse,
} from '../../interfaces';

const servicePath = '/recipe';

export async function fetchAll({ queryKey }: QueryFunctionContext) {
  const [_key, status] = queryKey;
  const { data } = await axios.get<ApiResponse<IRecipeGroupDTO[]>>(
    `${servicePath}${status ? `?status=${status}` : ''}`
  );
  return data.data;
}

export async function fetchById({ queryKey }: QueryFunctionContext) {
  const [_key, params] = queryKey;
  const { id } = params as { id: string };
  const { data } = await axios.get<ApiResponse<IRecipeSingleDTO>>(
    `${servicePath}/${id}`
  );
  return data.data;
}

export async function removeById(body: CommonSingleActionBodyType) {
  const { status } = await axios.post(`${servicePath}/Delete`, body);
  return status;
}

export async function create(body: IRecipeCreateDTO) {
  const { data } = await axios.post<ApiResponse<IRecipeSingleDTO>>(
    `${servicePath}/Create`,
    body
  );
  return data.data;
}

export async function update(body: IRecipeUpdateDTO) {
  const { data } = await axios.put<ApiResponse<IRecipeSingleDTO>>(
    `${servicePath}/Update`,
    body
  );
  return data.data;
}

export async function activate(body: CommonSingleActionBodyType) {
  const { data } = await axios.post<ApiResponse<IRecipeSingleDTO>>(
    `${servicePath}/Activate`,
    body
  );
  return data.data;
}
export async function deactivate(body: CommonSingleActionBodyType) {
  const { data } = await axios.post<ApiResponse<IRecipeSingleDTO>>(
    `${servicePath}/Deactivate`,
    body
  );
  return data.data;
}
