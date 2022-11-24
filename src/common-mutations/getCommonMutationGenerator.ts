import { QueryClient } from '@tanstack/react-query';
import { getSaveMutation } from './get-save-mutation';
import { BaseFuncType } from '../interfaces';
import { getChangeStatusMutation } from './get-change-status-mutation';
import { getRemoveMutation } from './get-remove-mutation';

export const getCommonMutationGenerator = <TData extends { id: number }>({
  entityName,
}: {
  entityName: string;
}) => {
  const queryClient = new QueryClient();

  return {
    getUpdateMutation: <TVariables>({
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
    getCreateMutation: <TVariables>({
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
    getActivateMutation: <TVariables>({
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
    getDeactivateMutation: <TVariables>({
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
    getRemoveMutation: <TVariables>({
      mainFunc,
    }: {
      mainFunc: BaseFuncType<number, TVariables>;
    }) =>
      getRemoveMutation<number, TVariables>({
        entityName,
        mainFunc,
      }),
  };
};
