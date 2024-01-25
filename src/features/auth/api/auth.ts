import { axios, wrapApiCall } from '@/lib/axios';

export type RegisterRequest = {
  email: string;
  password: string;
};

export type UserLoginRepo = {
  access_token: string;
};

export type User = {
  email: string;
  role: string;
};

export const registerApi = async (data: RegisterRequest) => {
  return wrapApiCall<boolean>(() => axios.post('/api/register', data));
};

export const verifyTokenEmailApi = async (token: string) => {
  return wrapApiCall<boolean>(() =>
    axios.post('/api/verify-token', { token, type: 'verify_email' }),
  );
};

export const sendTokenResetPasswordApi = async (email: string) => {
  return wrapApiCall<boolean>(() =>
    axios.post('/api/send-token', { email, type: 'reset_password' }),
  );
};

export const verifyTokenResetTokenApi = async (token: string) => {
  return wrapApiCall<boolean>(() =>
    axios.post('/api/verify-token', { token, type: 'reset_password' }),
  );
};

export const resetPasswordApi = async (payload: { token: string; password: string }) => {
  return wrapApiCall<boolean>(() => axios.post('/api/reset-password', payload));
};

export const loginApi = async (data: { email: string; password: string }) => {
  return wrapApiCall<UserLoginRepo>(() => axios.post('/api/login', data));
};

export const getUserApi = async () => {
  return wrapApiCall<User>(() => axios.get('/api/user'));
};
