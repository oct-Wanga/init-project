import customAxios from '@lib/CustomAxios';
import { Ime } from '@service/interface/users';

export default function getMe(): Promise<Ime> {
  return customAxios.get(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/users/me`).then(res => res.data.data);
}
