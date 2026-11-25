import { $authApi } from '../api-instance.js';
import { queryOptions } from '@tanstack/react-query';

export const orderService = {
  baseKey: 'orders',

  getOrders: async () => {
    const res = await $authApi.get('/orders');
    return res.data;
  },

  getOrdersQueryOptions: () => {
    return queryOptions({
      queryKey: [orderService.baseKey],
      queryFn: orderService.getOrders,
    });
  },

  createOrder: async (orderData) => {
    const res = await $authApi.post('/orders', orderData);
    return res.data;
  },
};
