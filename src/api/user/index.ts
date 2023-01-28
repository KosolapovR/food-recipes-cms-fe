import axios from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';

import { baseUrl } from '../const';
import { IUserGroupDTO, IUserSingleDTO } from '../../interfaces';

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
