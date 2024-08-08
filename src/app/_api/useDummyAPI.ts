import { AxiosError } from 'axios';
import customAxios from '@lib/CustomAxios';
import { useMutation, useQuery } from '@tanstack/react-query';

function getUseQueryDummy({ queryKey }: { queryKey: [string, number] }) {
  const [, id] = queryKey;

  try {
    return customAxios.get(`/api/posts/${id}`);
  } catch (e: any) {
    e.queryKey = queryKey;
    return Promise.reject(e);
  }
}

function postCreateEditing(body: any) {
  try {
    return customAxios.post('/api/service/editing', body);
  } catch (e) {
    return Promise.reject(e);
  }
}

export function useGetUseQueryDummy(id: number) {
  return useQuery<any, AxiosError, any, [_1: string, _2: number]>({
    queryKey: ['posts', id],
    queryFn: getUseQueryDummy,
  });
}

export default function useCreateEditing() {
  return useMutation<any, Error, any>({
    mutationFn: postCreateEditing,
    onMutate: () => {},
    onSuccess: () => {},
    onError: () => {},
  });
}
