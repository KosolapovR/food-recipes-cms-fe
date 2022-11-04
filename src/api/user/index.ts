import axios from 'axios';
import { baseUrl } from '../const';

export async function fetchUsers() {
  const { data } = await axios.get(`${baseUrl}/user`);
  return data.data;
}

export async function fetchUserById(id: string) {
  const { data } = await axios.get(`${baseUrl}/user/${id}`);
  return data.data;
}
