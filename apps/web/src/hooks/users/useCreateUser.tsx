import { IUser } from '@neha-project/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { request } from '../../utils/request';
import API from './constraints';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: {
      firstName: string | undefined;
      lastName: string | undefined;
      role: string | undefined;
      profileImgUrl: string | undefined;
      phoneNumber: string | undefined;
      attributes: any;
    }) =>
      request(
        {
          path: API.CREATE_USER.path,
          method: API.CREATE_USER.method,
        },
        {
          ...data,
        },
        true
      ),
    {
      onSuccess: (data: { data: IUser }) => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        toast.success(`${data.data.firstName} created successfully`);
      },
    }
  );
};