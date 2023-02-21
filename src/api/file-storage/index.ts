import axios from '../axios-instance';
import { IFileStorageResponse } from '../../interfaces';

const servicePath = '/upload';

export async function upload(body: FormData) {
  const { data } = await axios.post<IFileStorageResponse>(servicePath, body);
  return data;
}
