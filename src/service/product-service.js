import { $authApi } from "../api-instance.js";
import { queryOptions } from "@tanstack/react-query";

export const productService = {
  baseKey: 'products',

  getAll: async ({ category }, { signal }) => {
    const res = await $authApi.get('/products', {
      params: {
        category,
      },
      signal,
    });
    return res.data;
  },

  getProductsQueryOptions: ({ category }) => {
    return queryOptions({
      queryKey: [productService.baseKey, { category }],
      queryFn: (meta) => productService.getAll({ category }, meta),
    });
  },

  getById: async (id) => {
    const res = await $authApi.get(`/products/${id}`);
    return res.data;
  },

  addToFavorites: async (productId) => {
    const res = await $authApi.post('/favorites', { productId });
    return res.data;
  },

  removeFromFavorites: async (productId) => {
    const res = await $authApi.delete(`/favorites/${productId}`);
    return res.data;
  },
};
