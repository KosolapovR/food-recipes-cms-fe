import axios from 'axios';
import { baseUrl } from '../const';
import { IUserSingleDTO } from '../../interfaces';

export async function auth(body: {
  email: string;
  password: string;
}): Promise<IUserSingleDTO | undefined> {
  const { data } = await axios.post(`${baseUrl}/auth`, body);
  return data.data;
}
