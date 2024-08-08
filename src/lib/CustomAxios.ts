import axios, { AxiosInstance } from 'axios';

const customAxios: AxiosInstance = axios.create({
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

// 요청 인터셉터 추가하기
customAxios.interceptors.request.use(
  config => config,
  error => Promise.reject(error),
);

// 응답 인터셉터 추가하기
customAxios.interceptors.response.use(
  response => response,
  async error => Promise.reject(error),
);

export default customAxios;
