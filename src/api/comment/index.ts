import { QueryFunctionContext } from '@tanstack/react-query';

import axios from '../axios-instance';
import {
  ApiResponse,
  CommonGroupActionBodyType,
  CommonSingleActionBodyType,
  ICommentCreateDTO,
  ICommentGroupDTO,
  ICommentSingleDTO,
  ICommentUpdateDTO,
} from '../../interfaces';

const servicePath = 'comment';

export async function fetchAll({ queryKey }: QueryFunctionContext) {
  const [_key, status] = queryKey;
  const { data } = await axios.get<ApiResponse<ICommentGroupDTO[]>>(
    `${servicePath}${status ? `?status=${status}` : ''}`
  );
  return data.data;
}

export async function fetchById({ queryKey }: QueryFunctionContext) {
  const [_key, params] = queryKey;
  const { id } = params as { id: string };
  const { data } = await axios.get<ApiResponse<ICommentSingleDTO>>(
    `${servicePath}/${id}`
  );
  return data.data;
}

export async function removeById(body: CommonSingleActionBodyType) {
  const { status } = await axios.post(`${servicePath}/Delete`, body);
  return status;
}

export async function batchRemove(body: CommonGroupActionBodyType) {
  const { status } = await axios.post(`${servicePath}/BatchDelete`, body);
  return status;
}

export async function create(body: ICommentCreateDTO) {
  const { data } = await axios.post<ApiResponse<ICommentSingleDTO>>(
    `${servicePath}/Create`,
    body
  );
  return data.data;
}

export async function update(body: ICommentUpdateDTO) {
  const { data } = await axios.put<ApiResponse<ICommentSingleDTO>>(
    `${servicePath}/Update`,
    body
  );
  return data.data;
}

export async function activate(body: CommonSingleActionBodyType) {
  const { data } = await axios.post<ApiResponse<ICommentSingleDTO>>(
    `${servicePath}/Activate`,
    body
  );
  return data.data;
}
export async function deactivate(body: CommonSingleActionBodyType) {
  const { data } = await axios.post<ApiResponse<ICommentSingleDTO>>(
    `${servicePath}/Deactivate`,
    body
  );
  return data.data;
}
