import { useMutation, useQueryClient } from '@tanstack/react-query';
import { favoritesService } from "../../service/favorites-service.js";
import { productService } from "../../service/product-service.js";

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, isFavorite }) => {
      if (isFavorite) {
        return await favoritesService.removeFromFavorites(productId);
      } else {
        return await favoritesService.addToFavorites(productId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [productService.baseKey] });
      queryClient.invalidateQueries({ queryKey: [favoritesService.baseKey] });
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        alert('Пожалуйста, войдите в систему или зарегистрируйтесь');
      } else {
        console.error(error);
      }
    },
  });
}
