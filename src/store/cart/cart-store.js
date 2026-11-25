import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '../../service/cart-service.js';
export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId) => cartService.addToCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [cartService.baseKey] });
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
export function useUpdateCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, quantity }) => cartService.updateQuantity(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [cartService.baseKey] });
    },
  });
}
export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => cartService.removeFromCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [cartService.baseKey] });
    },
  });
}
export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartService.clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [cartService.baseKey] });
    },
  });
}
