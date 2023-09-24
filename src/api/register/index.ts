import axios from '../axios-instance';
import { IUserSingleDTO, ApiResponse } from '../../interfaces';
import { AxiosError } from 'axios';

const servicePath = '/register';

export async function register(body: { email: string; password: string }) {
  try {
    const { data } = await axios.post<ApiResponse<IUserSingleDTO>>(
      servicePath,
      body
    );
    return data.data;
  } catch (e) {
    return e as AxiosError;
  }
}
