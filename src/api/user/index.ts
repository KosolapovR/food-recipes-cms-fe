import { QueryFunctionContext } from '@tanstack/react-query';

import axios from '../axios-instance';
import {
  ApiResponse,
  CommonSingleActionBodyType,
  IUserCreateDTO,
  IUserGroupDTO,
  IUserSingleDTO,
  IUserUpdateDTO,
} from '../../interfaces';

const servicePath = 'user';

export async function fetchAll({ queryKey }: QueryFunctionContext) {
  const [_key, status] = queryKey;
  const { data } = await axios.get<ApiResponse<IUserGroupDTO[]>>(
    `${servicePath}${status ? `?status=${status}` : ''}`
  );
  return data.data;
}

export async function fetchById({ queryKey }: QueryFunctionContext) {
  const [_key, params] = queryKey;
  const { id } = params as { id: string };
  const { data } = await axios.get<ApiResponse<IUserSingleDTO>>(
    `${servicePath}/${id}`
  );
  return data.data;
}

export async function removeById(body: CommonSingleActionBodyType) {
  const { status } = await axios.post(`${servicePath}/Delete`, body);
  return status;
}

export async function createUser(body: IUserCreateDTO) {
  const { data } = await axios.post<ApiResponse<IUserSingleDTO>>(
    `${servicePath}/Create`,
    body
  );
  return data.data;
}

export async function update(body: IUserUpdateDTO) {
  const { data } = await axios.put<ApiResponse<IUserSingleDTO>>(
    `${servicePath}/Update`,
    body
  );
  const res: IUserSingleDTO = data.data;
  return res;
}

export async function activate(body: CommonSingleActionBodyType) {
  const { data } = await axios.post<ApiResponse<IUserSingleDTO>>(
    `${servicePath}/Activate`,
    body
  );
  return data.data;
}
export async function deactivate(body: CommonSingleActionBodyType) {
  const { data } = await axios.post<ApiResponse<IUserSingleDTO>>(
    `${servicePath}/Deactivate`,
    body
  );
  return data.data;
}
