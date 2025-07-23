import getMe from '@service/api/client/users';
import { Ime } from '@service/interface/users';
import { useQuery } from '@tanstack/react-query';

export default function useGetMe() {
  const { data } = useQuery<Ime>({
    queryKey: ['me'],
    queryFn: getMe,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return { data };
}
