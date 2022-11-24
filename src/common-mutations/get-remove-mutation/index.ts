import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useLocation } from '@tanstack/react-location';

export const getRemoveMutation = <TData, TVariables>({
  mainFunc,
  entityName,
}: {
  mainFunc: (v: TVariables) => Promise<TData>;
  entityName: string;
}) => {
  const location = useLocation();

  return useMutation<TData, unknown, TVariables>(mainFunc, {
    onSuccess: () => {
      toast.success(`${entityName} was deleted`);

      location.history.back();
    },
    onError: (error) => {
      toast.error(`Can't delete ${entityName}`, {
        data: error,
      });
    },
  });
};
