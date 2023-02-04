import axios from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';

import { baseUrl } from '../const';
import {
  CommonSingleActionBodyType,
  IUserCreateDTO,
  IUserGroupDTO,
  IUserSingleDTO,
  IUserUpdateDTO,
} from '../../interfaces';

export async function fetchUsers({ queryKey }: QueryFunctionContext) {
  const [_key, status] = queryKey;
  const { data } = await axios.get(
    `${baseUrl}/user${status ? `?status=${status}` : ''}`
  );
  const res: IUserGroupDTO[] = data.data;
  return res;
}

export async function fetchUserById({ queryKey }: QueryFunctionContext) {
  const [_key, params] = queryKey;
  const { id } = params as { id: string };
  const { data } = await axios.get(`${baseUrl}/user/${id}`);
  const res: IUserSingleDTO = data.data;
  return res;
}

export async function removeUserById(body: CommonSingleActionBodyType) {
  const { status } = await axios.post(`${baseUrl}/user/Delete`, body);
  return status;
}

export async function createUser(body: IUserCreateDTO) {
  const { data } = await axios.post(`${baseUrl}/user/Create`, body);
  const res: IUserSingleDTO = data.data;
  return res;
}

export async function updateUser(body: IUserUpdateDTO) {
  const { data } = await axios.put(`${baseUrl}/user/Update`, body);
  const res: IUserSingleDTO = data.data;
  return res;
}

export async function activateUser(body: CommonSingleActionBodyType) {
  const { data } = await axios.post(`${baseUrl}/user/Activate`, body);
  const res: IUserSingleDTO = data.data;
  return res;
}
export async function deactivateUser(body: CommonSingleActionBodyType) {
  const { data } = await axios.post(`${baseUrl}/user/Deactivate`, body);
  const res: IUserSingleDTO = data.data;
  return res;
}
