import { IChild, IUser } from '@neha-project/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { request } from '../../utils/request';
import API, { REACT_QUERY_NAME } from './constraints';

export const useCreateChildren = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: {
      firstName: string | undefined;
      lastName: string | undefined;
      attributes: any;
    }) =>
      request(
        {
          path: API.CREATE_CHILDREN.path,
          method: API.CREATE_CHILDREN.method,
        },
        {
          ...data,
        },
        true
      ),
    {
      onSuccess: (data: IChild) => {
        queryClient.invalidateQueries({ queryKey: [REACT_QUERY_NAME] });
        toast.success(`${data.firstName} created successfully`);
      },
    }
  );
};
