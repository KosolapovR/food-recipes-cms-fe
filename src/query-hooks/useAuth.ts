import { useQueryClient } from '@tanstack/react-query';
import { IUserSingleDTO } from '../interfaces';

export const useAuth = (): IUserSingleDTO | undefined => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<IUserSingleDTO | undefined>(['auth']);
};
