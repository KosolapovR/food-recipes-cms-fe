import axios from 'axios';
import { baseUrl } from '../const';
import { IUserSingleDTO } from '../../interfaces';

export async function auth(body: { email: string; password: string }) {
  const { data } = await axios.post(`${baseUrl}/auth`, body);
  const res: IUserSingleDTO = data.data;
  return res;
}

export async function me() {
  const { data } = await axios.get(`${baseUrl}/auth/me`);
  const res: IUserSingleDTO = data.data;
  return res;
}
