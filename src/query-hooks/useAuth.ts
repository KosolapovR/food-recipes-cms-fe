import { useQueryClient } from '@tanstack/react-query';
import { IAuth } from '../interfaces';

export const useAuth = (): IAuth | undefined => {
  const queryClient = useQueryClient();
  return (
    queryClient.getQueryData<IAuth | undefined>(['auth']) || {
      email: '',
      isAdmin: false,
    }
  );
};
