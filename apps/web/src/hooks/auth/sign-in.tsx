import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '../../utils/request';

export const useSignInMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ name, password }: { name: string; password: string }) =>
      request(
        {
          path: 'auth/sign-in',
          method: 'POST',
        },
        {
          name: name,
          password: password,
        },
        true
      ),
    {
      onSuccess: (tokens) => {
        queryClient.setQueryData(['token'], tokens);
      },
    }
  );
};
