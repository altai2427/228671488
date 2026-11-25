import { $mainApi } from '../api-instance.js';

function saveToken(data) {
  const token =
    data?.token ||
    data?.accessToken ||
    data?.access_token ||
    data?.data?.token ||
    data?.data?.accessToken;

  if (token) {
    localStorage.setItem('accessToken', token);
  }
}

export const authService = {
  login: async (loginData) => {
    const res = await $mainApi.post('/auth/sign-in', loginData);
    saveToken(res.data);
    return res.data;
  },

  register: async (registerData) => {
    const res = await $mainApi.post('/auth/sign-up', registerData);
    saveToken(res.data);
    return res.data;
  },

  logout: async () => {
    await $mainApi.post('/auth/logout');
    localStorage.removeItem('accessToken');
  },

  refresh: async () => {
    const res = await $mainApi.post('/auth/refresh');
    saveToken(res.data);
    return res.data;
  },
};
