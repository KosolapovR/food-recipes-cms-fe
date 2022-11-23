import { QueryClient } from '@tanstack/react-query';
import { getSaveMutation } from './get-save-mutation';
import { SaveFuncType } from '../interfaces';

export const getCommonMutationGenerator = <
  TData extends { id: number }
>(params: {
  queryClient: QueryClient;
  entityName: string;
}) => ({
  getUpdateMutation: <TVariables>({
    mainFunc,
  }: {
    mainFunc: SaveFuncType<TData, TVariables>;
  }) =>
    getSaveMutation<TData, TVariables>({
      ...params,
      mainFunc,
      isCreate: false,
    }),
  getCreateMutation: <TVariables>({
    mainFunc,
  }: {
    mainFunc: SaveFuncType<TData, TVariables>;
  }) =>
    getSaveMutation<TData, TVariables>({
      ...params,
      mainFunc,
      isCreate: true,
    }),
});
