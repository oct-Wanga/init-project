import customAxios from '@lib/CustomAxios';
import { Ime } from '@service/interface/users';

export default async function getMeServer(cookieHeader: string): Promise<Ime> {
  return customAxios
    .get(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/users/me`, {
      headers: {
        Cookie: cookieHeader,
      },
    })
    .then(res => res.data.data);
}
