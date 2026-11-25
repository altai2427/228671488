import { $authApi } from '../api-instance.js';
import { queryOptions } from '@tanstack/react-query';

export const cartService = {
  baseKey: 'cart',

  getCart: async () => {
    const res = await $authApi.get('/cart');
    return res.data;
  },

  getCartQueryOptions: () => {
    return queryOptions({
      queryKey: [cartService.baseKey],
      queryFn: cartService.getCart,
    });
  },

  addToCart: async (productId) => {
    const res = await $authApi.post('/cart', { productId, quantity: 1 });
    return res.data;
  },

  updateQuantity: async (productId, quantity) => {
    const res = await $authApi.patch(`/cart/${productId}`, { quantity });
    return res.data;
  },

  removeFromCart: async (productId) => {
    const res = await $authApi.delete(`/cart/${productId}`);
    return res.data;
  },

  clearCart: async () => {
    const res = await $authApi.delete('/cart');
    return res.data;
  },
};
