import { QueryClient } from '@tanstack/react-query';
import { getSaveMutation } from './get-save-mutation';
import { BaseFuncType } from '../interfaces';
import { getChangeStatusMutation } from './get-change-status-mutation';
import { generateRemoveMutation } from './get-remove-mutation';

export const getCommonMutationGenerator = <TData extends { id: number }>({
  queryClient,
  entityName,
}: {
  queryClient: QueryClient;
  entityName: string;
}) => {
  return {
    generateUpdateMutation: <TVariables>({
      mainFunc,
    }: {
      mainFunc: BaseFuncType<TData, TVariables>;
    }) =>
      getSaveMutation<TData, TVariables>({
        entityName,
        queryClient,
        mainFunc,
        isCreate: false,
      }),
    generateCreateMutation: <TVariables>({
      mainFunc,
    }: {
      mainFunc: BaseFuncType<TData, TVariables>;
    }) =>
      getSaveMutation<TData, TVariables>({
        entityName,
        queryClient,
        mainFunc,
        isCreate: true,
      }),
    generateActivateMutation: <TVariables>({
      mainFunc,
    }: {
      mainFunc: BaseFuncType<TData, TVariables>;
    }) =>
      getChangeStatusMutation<TData, TVariables>({
        entityName,
        queryClient,
        mainFunc,
        errorMsg: `Can't activate ${entityName}`,
        successMsg: `${entityName} was activated`,
      }),
    generateDeactivateMutation: <TVariables>({
      mainFunc,
    }: {
      mainFunc: BaseFuncType<TData, TVariables>;
    }) =>
      getChangeStatusMutation<TData, TVariables>({
        entityName,
        queryClient,
        mainFunc,
        errorMsg: `Can't deactivate ${entityName}`,
        successMsg: `${entityName} was deactivated`,
      }),
    generateRemoveMutation: <TVariables>({
      mainFunc,
    }: {
      mainFunc: BaseFuncType<number, TVariables>;
    }) =>
      generateRemoveMutation<number, TVariables>({
        entityName,
        mainFunc,
      }),
  };
};
