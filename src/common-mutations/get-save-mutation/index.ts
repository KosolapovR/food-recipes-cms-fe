import { toast } from 'react-toastify';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-location';

export const getSaveMutation = <TData extends { id: number }, TVariables>({
  queryClient,
  mainFunc,
  entityName,
  isCreate,
}: {
  queryClient: QueryClient;
  mainFunc: (v: TVariables) => Promise<TData>;
  entityName: string;
  isCreate: boolean;
}) => {
  const navigation = useNavigate();
  return useMutation<TData, unknown, TVariables>(mainFunc, {
    onSuccess: (saveResult: TData) => {
      toast.success(`${entityName} was ${isCreate ? 'created' : 'updated'}`);
      if (isCreate) {
        queryClient.setQueryData<TData[]>([`${entityName}s`], (old) => {
          return [...(old || []), saveResult];
        });

        navigation({ to: `/${entityName}s/${saveResult.id}`, replace: true });
      } else {
        queryClient.setQueryData<TData[]>([`${entityName}s`], (old) => {
          return (old || []).map((r) =>
            r.id === saveResult.id ? saveResult : r
          );
        });
        queryClient.setQueryData<TData>(
          [`${entityName}s`, saveResult.id],
          () => {
            return saveResult;
          }
        );
      }
    },
    onError: (error) => {
      toast.error(`Can't ${isCreate ? 'create' : 'update'} ${entityName}`, {
        data: error,
      });
    },
  });
};
