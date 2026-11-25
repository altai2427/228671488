import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../../service/order-service.js';
import { cartService } from '../../service/cart-service.js';

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (orderData) => orderService.createOrder(orderData),
    onSuccess: async () => {
      await cartService.clearCart();
      queryClient.invalidateQueries({ queryKey: [cartService.baseKey] });
      queryClient.invalidateQueries({ queryKey: [orderService.baseKey] });
      alert('Заказ успешно оформлен!');
      navigate('/orders');
    },
    onError: () => {
      alert('Ошибка при оформлении заказа');
    },
  });
}
