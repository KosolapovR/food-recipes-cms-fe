import { toast } from 'react-toastify';
import { QueryClient, useMutation } from '@tanstack/react-query';

export const getChangeStatusMutation = <
  TData extends { id: number },
  TVariables
>({
  queryClient,
  mainFunc,
  entityName,
  successMsg,
  errorMsg,
}: {
  queryClient: QueryClient;
  mainFunc: (v: TVariables) => Promise<TData>;
  entityName: string;
  successMsg: string;
  errorMsg: string;
}) => {
  return useMutation<TData, unknown, TVariables>(mainFunc, {
    onSuccess: (result: TData) => {
      toast.success(successMsg);
      queryClient.setQueryData<TData[]>([`${entityName}s`], (old) => {
        return (old || []).map((r) => (r.id === result.id ? result : r));
      });
      queryClient.setQueryData<TData>(
        [`${entityName}s`, { id: result.id.toString() }],
        result
      );
    },
    onError: (error) => {
      toast.error(errorMsg, {
        data: error,
      });
    },
  });
};
