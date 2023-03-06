import { request } from '../../utils/request';
import { useQuery } from '@tanstack/react-query';
import API, { REACT_QUERY_NAME } from './constraints';

export function useChild(id: string) {
  return useQuery([REACT_QUERY_NAME, id], () =>
    request(
      {
        path: `${API.FIND_ONE.path}${id}`,
        method: API.FIND_ONE.method,
      },
      null,
      true
    )
  );
}
