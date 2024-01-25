import Axios, { AxiosRequestConfig } from 'axios';

import { API_URL } from '@/config';
import { useNotificationStore } from '@/stores';
import { storage } from '@/utils';

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken();
  if (config?.headers) {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.Accept = 'application/json';
  }

  return config as any;
}

export const axios = Axios.create({
  // baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error);
    if (error.response?.status === 401) {
      storage.clearToken();
      window.location.reload();
    } else {
      const message = error.response?.data?.message || error.message;
      useNotificationStore.getState().addNotification({
        type: 'error',
        title: 'Error',
        message,
      });
    }

    return Promise.reject(error);
  },
);

type ErrorResponseApi = {
  status: number;
  code: string;
  message: string;
};

type AxiosResponse<T> = {
  metadata: T;
};

export const wrapApiCall = async <T>(apiCall: () => Promise<AxiosResponse<T>>): Promise<T> => {
  try {
    const response = await apiCall();
    return response.metadata;
  } catch (error: any) {
    // You can customize the error handling as needed
    console.error('API error:', error);
    throw error?.response?.data as ErrorResponseApi;
  }
};
