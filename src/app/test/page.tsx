import getUseQueryDummyServer from '@api/useDummyAPIServer';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import TestItem from '@test/_component/TestItem';

/**
 * Server Component 로 구성되어 있으며
 * prefetchQuery로 데이터 서버에서 호출 후 캐싱
 * @constructor
 */
export default async function Test() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({ queryKey: ['color', 0], queryFn: getUseQueryDummyServer });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <TestItem />
    </HydrationBoundary>
  );
}
