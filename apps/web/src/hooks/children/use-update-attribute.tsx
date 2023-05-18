/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { request } from '../../utils/request';
import API, { REACT_QUERY_NAME } from './constraints';

export const useSetAttributes = (
  childId: string,
  attribute: 'height' | 'weight' | 'vaccination'
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: any) =>
      request(
        {
          path: `${API.SET_ATTRIBUTE.path}${childId}/${attribute}`,
          method: API.SET_ATTRIBUTE.method,
        },
        data,
        true
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [REACT_QUERY_NAME] });
        toast.success(`child ${attribute} updated successfully`);
      },
    }
  );
};
