import { request } from '../../utils/request';
import { useQuery } from '@tanstack/react-query';
import API, { REACT_QUERY_NAME } from './constraints';

export function useChildren() {
  return useQuery([REACT_QUERY_NAME], () =>
    request(
      {
        path: API.ALL_CHILDREN.path,
        method: API.ALL_CHILDREN.method,
      },
      null,
      true
    )
  );
}
