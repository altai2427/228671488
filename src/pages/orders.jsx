import { useQuery } from '@tanstack/react-query';
import { orderService } from '../service/order-service.js';

export function OrdersPage() {
  const { data, isLoading } = useQuery({ ...orderService.getOrdersQueryOptions() });

  const orders = data?.data || data?.orders || data || [];

  if (isLoading) return <p>загрузка</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-teal-500 mb-6">Мои заказы</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">Заказов нет</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => {
            const id = order._id || order.id;
            const items = order.items || [];
            const total = order.totalPrice || order.total || items.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0);

            return (
              <div key={id} className="bg-white flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="font-bold">заказ #{id}</span>
                  <span className="text-teal-600 font-semibold">{order.status || 'В обработке'}</span>
                </div>

                {order.createdAt && <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>}

                <div className="border-t border-b py-2 flex flex-col gap-1">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{item.product?.name || item.name || item.productId} x{item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="text-right font-bold">Итого: ${Number(total).toFixed(2)}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
