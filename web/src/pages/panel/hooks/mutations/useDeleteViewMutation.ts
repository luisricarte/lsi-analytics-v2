import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { reactQueryKeys } from '@/constants/react-query-keys';
import { ApiError } from '@/services/types';
import { DeleteViewProps, viewsService } from '@/services/views';

export const useDeleteViewMutation = (
  props?: UseMutationOptions<AxiosResponse<void>, ApiError, DeleteViewProps>,
) =>
  useMutation({
    mutationKey: [reactQueryKeys.mutations.deleteViewMutation],
    mutationFn: viewsService.delete,
    ...props,
  });
