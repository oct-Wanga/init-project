'use client';

import { useGetUseQueryDummy } from '@api/useDummyAPI';

/**
 * 상위 페이지에서 캐싱된 데이터를 useQuery로 불러와 호출
 * @constructor
 */
export default function TestItem() {
  const { data, isLoading } = useGetUseQueryDummy(0);

  if (isLoading) return null;

  return (
    <div>
      test component
      <div>{data}</div>
    </div>
  );
}
