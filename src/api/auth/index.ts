import axios from 'axios';
import { baseUrl } from '../const';

export async function auth(body: { email: string; password: string }) {
  const { data } = await axios.post(`${baseUrl}/auth`, body);
  return data;
}
