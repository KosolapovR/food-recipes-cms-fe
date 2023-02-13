import axios from '../axios-instance';
import { IUserSingleDTO, ApiResponse } from '../../interfaces';

const servicePath = '/auth';

export async function auth(body: { email: string; password: string }) {
  const { data } = await axios.post<ApiResponse<IUserSingleDTO>>(
    servicePath,
    body
  );
  return data.data;
}

export async function getMe() {
  const { data } = await axios.get<ApiResponse<IUserSingleDTO>>(
    `${servicePath}/me`
  );
  return data.data;
}
