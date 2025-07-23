import { Cookies } from 'react-cookie';
import axios, { AxiosInstance } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const customAxios: AxiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

const cookies = new Cookies();

customAxios.interceptors.response.use(
  res => res,
  error => {
    if (axios.isAxiosError(error) && error.response) {
      const { status } = error.response;

      if (status === 403) {
        window.location.replace(`/err/service-blocked`);
        return Promise.reject(error);
      }
      if (status >= 500) throw new Error('Internal Server Error');
    }
    return Promise.reject(error);
  },
);

const getLocale = (): string => {
  if (typeof window === 'undefined') return '';
  const [, maybeLocale] = window.location.pathname.split('/');
  return maybeLocale || '';
};

const refreshAuthLogic = async () => {
  const isRefreshToken = cookies.get('REFRESH_TOKEN');
  const locale = getLocale();

  if (!isRefreshToken) return window.location.replace(`${process.env.NEXT_PUBLIC_PORTAL}/${locale}/portal/login`);

  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_AUTH}/auth/v3/refresh-token`, null, { withCredentials: true });

    return await Promise.resolve();
  } catch (error) {
    window.location.replace(`${process.env.NEXT_PUBLIC_PORTAL}/${locale}/portal/login`);
    return Promise.reject(error);
  }
};

createAuthRefreshInterceptor(customAxios, refreshAuthLogic, {
  statusCodes: [401],
  pauseInstanceWhileRefreshing: true,
});

export default customAxios;
