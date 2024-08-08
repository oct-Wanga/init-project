'use server';

import customAxios from '@lib/CustomAxios';

export default async function getUseQueryDummyServer({ queryKey }: { queryKey: [string, number] }) {
  const [, id] = queryKey;

  try {
    const res = await customAxios.get(`/api/posts/${id}`);
    return res.data;
  } catch (e: any) {
    e.queryKey = queryKey;
    return Promise.reject(e);
  }
}
