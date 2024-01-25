import { axios, wrapApiCall } from '@/lib/axios';

export type TrackingProductRequest = {
  url: string;
};

export const trackingProductApi = (payload: TrackingProductRequest) => {
  return wrapApiCall<boolean>(() => axios.post('/api/tracking-product', payload));
};
