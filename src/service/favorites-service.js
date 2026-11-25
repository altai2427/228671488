import { $authApi } from "../api-instance.js";
import { queryOptions } from "@tanstack/react-query";

export const favoritesService = {
  baseKey: 'favorites',

  getAll: async () => {
    const res = await $authApi.get('/favorites');
    return res.data;
  },

  getFavoritesQueryOptions: () => {
    return queryOptions({
      queryKey: [favoritesService.baseKey],
      queryFn: favoritesService.getAll,
    });
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
